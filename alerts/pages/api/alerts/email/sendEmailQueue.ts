import { NextApiRequest, NextApiResponse } from "next";

import { pgsql } from "../../../../lib/db";
import { sendAlertEmails, sendAlertSettingUpdate } from "../../../../lib/mail";
import composeEmailMessages from "../../../../util/serverSideHelpers/alerts/composeEmailMessages";
import generateMailJetMessagesObjFromArray from "../../../../util/serverSideHelpers/alerts/generateMailJetMessagesObjFromArray";
import parseMailJetResponse from "../../../../util/serverSideHelpers/alerts/parseMailJetResponse";
import {
  getUnsentEmailsQueue,
  insertEmailMessagesToQueueTable,
  insertIntoEmailLogTable,
  updateEmailQueueTable,
} from "../../../../util/serverSideHelpers/alerts/sqlRawQuires";
import throwError from "../../../../util/throwError";

const TIME_TO_SEND_EMAILS = process.env.TIME_TO_SEND_EMAILS || 9; // 9 am
const TIME_TO_EMPTY_QUEUE = process.env.TIME_TO_EMPTY_QUEUE || 18; // 6 pm

/**
 * @swagger
 * /api/alerts/email/sendEmailQueue:
 *   get:
 *     tags: [Emails]
 *     summary: Trigger the email queue to send emails
 *     description:
 *        This api route is triggered by a cron job every 30 minutes, it checks if it's time to send emails and if it is, it sends them. There is an authentication check to make sure only the cron job can trigger this route. using `trigger_secret` env variable, delivered in the request header. </br>
 *        If the table is empty and time is after 9 am and before 5pm and if so, load composeEmailMessages and check if there are composed messages and if so, insert them into the queue table. it checks if the webapp.notifications_email_queue table is full and if time is after 9 am and before 5pm and if so, send emails and fill the log table then and mark the emails as sent `track_id=1` and `sent_at=now()`. </br>
 *        If there are messages, fill the queue table with data then send emails and empty the queue table or mark the emails as sent `track_id=1` and `sent_at=now()`. If the table is empty and time is after 5pm and if so, do nothing.
 *        <h1>Features:</h1>
 *          <ol>
 *            <ul>Checks sending window, to send only between 9 am and 5 pm.</ul>
 *            <ul>Includes an authentication check, to make sure only the cron job can trigger this route.</ul>
 *            <ul>Checks if the `webapp.notifications_email_queue` table is full or empty.</ul>
 *            <ul>Fills in Log table with sent messages `webapp.notifications_email_log`.</ul>
 *            <ul>Stores number of trials on the message.</ul>
 *            <ul>Logs stat of message, `0`=pending, `1`=sent, `3`=delivered, `2`=opened, `9`=failed.</ul>
 *            <ul>Stores the `track_id` of the message.</ul>
 *          </ol>
 *        <h1>planned features V1.1:</h1>
 *        <ol>
 *          <ul>Support generic types (subscriptions_types), to work with other types than controversies, such as ESG parameters. change or price change.</ul>
 *          <ul>Store trigger id in queue log.</ul>
 *          <ul>Add trigger type table to db, to provide and store triggers information.</ul>
 *          <ul>Add trigger type to queue log.</ul>
 *          <ul>Adjust trigger time from dashboard.</ul>
 *          </ol>
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: trigger_id
 *        description: The trigger id, to store where the trigger came from, for future use.
 *        type: integer
 *        required: true
 *        example: 1
 *      - in: header
 *        name: trigger_secret
 *        type: string
 *        required: true
 *        description: The secret key to authenticate the request, to make sure only the cron job can trigger this route.
 *        example: e7895ee539511347c074f12ff29a5cc7cdcc4c4850e8be14f8ce647786d05063
 *     responses:
 *      201:  # success response
 *       description: Expected response to a valid request, emails sent
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            success:
 *             type: boolean
 *             example: true
 *             required: true
 *            message:
 *             type: string
 *             example: 5 emails sent successfully!
 *      204: # OK
 *       description: OK response to a valid request, no emails to send, this could be because the queue is empty or because it's not time to send emails, check TIME_TO_SEND_EMAILS & TIME_TO_EMPTY_QUEUE in environments variables (.env).
 *      400:  # bad request
 *       description: bad request, no emails sent
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            success:
 *             type: boolean
 *             example: false
 *            status:
 *             type: integer
 *             enum: [400,500]
 *             example: 400
 *            error:
 *             type: string
 *             enum: ["no emails to send", "no emails to send, no emails in queue", "no emails to send, no emails in queue, no emails composed"]
 *             example: Cannot send emails or fill email queue tables! You might be re-generating the same TextPart for an existing email ID. Empty the table or generate entire new message.
 */

const triggerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { trigger_id } = req.query;

    const { trigger_secret, host } = req.headers;
    let message = "Success!";
    let status = 200;

    // if trigger_id is present else throw error

    if (!trigger_id)
      throwError(401, "Authentication Error: No trigger_id found!");

    // check if trigger_secret present else throw error
    if (!trigger_secret)
      throwError(401, "Authentication Error: No trigger_secret found!");

    // Authenticate Trigger, by checking if trigger_id is valid
    if (trigger_secret !== process.env.TRIGGER_SECRET)
      throwError(401, "Authentication Error, Invalid trigger_secret!");

    // load webapp.notifications_email_queue table
    const { rows: emailQueue }: any = await pgsql.query(getUnsentEmailsQueue);

    // check if table is empty and time is after 9 am and before 5pm and if so, run composeEmailMessages and check if there are composed messages ready to send.

    if (
      emailQueue.length === 0 &&
      new Date().getHours() >= TIME_TO_SEND_EMAILS &&
      new Date().getHours() <= TIME_TO_EMPTY_QUEUE
    ) {
      // get users and subscription types
      // get all users and scandals
      // compose EmailMessages
      const { messagesArrays, messagesObjects, count } =
        await composeEmailMessages(host);

      // Check if there are composed messages
      if (count == 0)
        throwError(
          400,
          "Done! @ step: (1/5) However, No new news found! No emails sent and no messages composed!"
        );

      // IF there are messages:
      // 1. Fill webapp.notifications_email_queue table

      const fillQueueTable = await pgsql.query(
        insertEmailMessagesToQueueTable(messagesArrays)
      );

      if (!fillQueueTable.rowCount)
        throwError(
          400,
          `error or Composing email Issue! @ step: (2/5) [between ${TIME_TO_SEND_EMAILS}:00 & ${TIME_TO_EMPTY_QUEUE}:00 ] However, Cannot send emails or fill email queue tables! You might be re-generating the same TextPart for an existing email ID. Empty the table or generate entire new message.`
        );
      // read queue table again to use uuids when storing in log table
      const { rows: emailQueue }: any = await pgsql.query(getUnsentEmailsQueue);
      // check if emailQueue is full with new messages
      if (emailQueue.length === 0)
        throwError(400, "Error, cannot read new emails, or queue is empty!");
      // send emails
      const emailsResponse = await sendAlertEmails(
        generateMailJetMessagesObjFromArray(emailQueue)
      );

      // 2. Send emails using MailJet by passing messageItemsObjectArray
      //   const emailsResponse = await sendAlertEmails(messagesObjects);
      if (!emailsResponse.body.Messages)
        throwError(
          400,
          `Error with email sending function @ step (3/5)! Thought it is between [ ${TIME_TO_SEND_EMAILS}:00 & ${TIME_TO_EMPTY_QUEUE}:00 ] However, Cannot send emails or fill email queue tables!`
        );

      const messagesResponse = await parseMailJetResponse(
        emailsResponse,
        0,
        emailQueue
      );

      const fillLogTable = await pgsql.query(
        insertIntoEmailLogTable(messagesResponse)
      );
      console.log("end");
      if (!fillLogTable.rowCount)
        throwError(400, "Error @ step: (4/5) cannot update email log tables!");

      // update webapp.notifications_email_queue table with track_id = 1 and attempts = 1 and sent_at = now()
      const updateQueueTable = await pgsql.query(updateEmailQueueTable);
      if (!updateQueueTable.rowCount)
        throwError(
          400,
          "Error @ step: (5/5) cannot update email queue tables!"
        );

      //   res.status(status).json(messagesResponse, fillQueueTable);

      message = `Success! ${emailsResponse.body.Messages.length} emails sent, queue is updated and log file has been filled!`;
      status = 201;

      // to stop the execution of the function
      emailQueue.length = 0;
    }

    // check if table is full & if time is after 9 am and before 5pm
    if (
      emailQueue.length > 0 &&
      new Date().getHours() >= TIME_TO_SEND_EMAILS &&
      new Date().getHours() <= TIME_TO_EMPTY_QUEUE
    ) {
      // send emails
      const emailsResponse = await sendAlertEmails(
        generateMailJetMessagesObjFromArray(emailQueue)
      );

      // fill webapp.notifications_email_log table
      const messagesResponse = await parseMailJetResponse(
        emailsResponse,
        0,
        emailQueue
      );
      const fillLogTable = await pgsql.query(
        insertIntoEmailLogTable(messagesResponse)
      );
      if (!fillLogTable.rowCount)
        throwError(
          400,
          "Error @ step: (3/4) cannot update email queue tables!"
        );

      // update webapp.notifications_email_queue table with track_id = 1 and attempts = 1 and sent_at = now()
      const updateQueueTable = await pgsql.query(updateEmailQueueTable);

      // Mark the emails as sent `track_id=1` and `sent_at=now()`
      if (!updateQueueTable.rowCount)
        throwError(
          400,
          "Error @ step: (4/4) cannot update email queue tables!"
        );

      message =
        "Trigger executed successfully! emails sent from the queue table, this is a second attempt!";
      status = 201;

      // to stop the execution of the function
      emailQueue.length = 0;
    }

    // check if full and time is after 5pm and if so, empty table
    if (emailQueue.length > 0 && new Date().getHours() >= TIME_TO_SEND_EMAILS) {
      // empty webapp.notifications_email_queue table

      message = `Trigger executed successfully! However no emails sent! as queue table is full and time is after ${TIME_TO_EMPTY_QUEUE}:00 and if so, send queue table been emptied!`;
      status = 201;

      // to stop the execution of the function
      emailQueue.length = 0;
    }

    // if empty, check if time is after 5pm and if so, do nothing
    if (
      emailQueue.length === 0 &&
      new Date().getHours() > TIME_TO_EMPTY_QUEUE
    ) {
      // do nothing
      message = `Nothing to been done! it is after ${TIME_TO_EMPTY_QUEUE}:00 and Sending queue is empty.`;
      status = 204;
    }

    // if empty, check if time is after 5pm and if so, do nothing
    if (
      emailQueue.length === 0 &&
      new Date().getHours() < TIME_TO_SEND_EMAILS
    ) {
      // do nothing
      message = `Nothing sent! It is before ${TIME_TO_SEND_EMAILS}:00 and Sending queue is empty. Alerts are only sent between ${TIME_TO_SEND_EMAILS}:00 and ${TIME_TO_EMPTY_QUEUE}:00`;
      status = 204;
    }

    if (status === 204) return res.status(status).end();

    res.status(status).json({
      success: true,
      status,
      message,
    });
  } catch (e: any) {
    console.error(e.message);
    // send email to user confirming subscription or un-subscription
    if (e.status !== 400)
      await sendAlertSettingUpdate(
        process.env.ALERTS_ERROR_REPORTING_TO || "support@gaia-lens.com",
        process.env.ALERTS_SENDER_NAME || "GaiaLens support",
        "ERROR while sending alerts",
        "no emails sent! ",
        "No emails have been sent to subscribers!</br></br> Please check the logs for more details! </br> </br> <b> Error Message:" +
          e.message +
          " </b> </br> </br>" +
          e.message
      );
    res
      .status(e.status || 500)

      .send({ success: false, status: e.status, error: e.message });
  }
};

export default triggerHandler;
