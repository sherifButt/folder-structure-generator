import { NextApiRequest, NextApiResponse } from "next";

import { pgsql } from "../../../../lib/db";
import composeEmailMessages from "../../../../util/serverSideHelpers/alerts/composeEmailMessages";
import { getAllScandalsAndUsers } from "../../../../util/serverSideHelpers/alerts/sqlRawQuires";
import throwError from "../../../../util/throwError";

/**
 * Email Alerts API
 * @module Email Alerts API
 * @requires next
 */

/**
 * @typedef {object} NextApiRequest
 * @property {object} headers - request headers
 * @property {object} query - request query
 * @property {string} query.query - if true, returns all users and scandals
 * @property {object} body - request body
 * @property {string} body.email_id - secure Email ID, generated automatically and stored in 
 * `webapp.notifications.email.queue` table.
 * @property {string} body.recipient - User id of the user who opened the email. used the flag
 *  name "recipient" instead of `user_id` to avoid getting user id getting exposed, as this 
 *  tracking link could be used on many places over the internet.
 */

/**
 * Returns an example of composed email message, this text generator can generate any other
 * text content such as ESG reports. </br>
 * 
 * @name get/api/alerts/email/composeMessages
 * @function
 * @memberof module:Email Alerts API
 * @swagger
 * /api/alerts/email/composeMessages:
 *   get:
 *     tags: [Emails]
 *     summary: Compose Email Messages
 *     description:
 *         Returns an example of composed email message, this text generator can generate any other text content such as ESG reports. </br>
 *     produces:
 *      - application/json
 *     responses:
 *      201:  # success response
 *       description: Expected response to a valid request, emails sent
 *
 *      400:  # bad request
 *       description: bad request, no emails sent
 *
 */
const triggerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { host } = req.headers;
    const { query = false } = req.query;

    // compose EmailMessages
    const { messagesArrays, messagesObjects, count } =
      await composeEmailMessages(host);

    // get all users and scandals
    const { rows: usersAndScandals }: any = await pgsql.query(
      getAllScandalsAndUsers
    );
    if (!usersAndScandals) throw new Error("No users or scandals found!");

    // Check if there are composed messages
    if (count == 0) throwError(400, "cannot generate email messages!");

    // const textPart = htmlToText(messagesObjects[0].HTMLPart);

    // console.log(textPart);
    res.status(201).json({
      success: true,
      status: 201,
      message: "email message composed",
      data: query ? usersAndScandals : messagesObjects,
    });
  } catch (e: any) {
    console.error(e.message);
    res
      .status(e.status || 500)
      .send({ success: false, status: e.status, error: e.message });
  }
};

export default triggerHandler;
