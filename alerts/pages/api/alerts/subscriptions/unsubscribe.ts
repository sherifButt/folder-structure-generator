import { NextApiRequest, NextApiResponse } from "next";

import { pgsql } from "../../../../lib/db";
import { sendAlertSettingUpdate } from "../../../../lib/mail";
import htmlWrapper from "../../../../util/serverSideHelpers/alerts/htmlWrapper";
import {
  getUserByEmailAndOrPortfolioId,
  getUserByUserIdAndOrPortfolioId,
} from "../../../../util/serverSideHelpers/alerts/sqlRawQuires";

/**
 * @swagger
 * /api/alerts/subscriptions/unsubscribe:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Managing the un-subscription flow for alerts
 *     description: This API is responsible about managing the un-subscription flow, via both (email or user_id) and `portfolio_id`.  There is authentication layer that checks if the email and `portfolio_id` are valid and belongs to user via a crypto secure uuid stored in the request header.  there is support for hot toggling the subscriptions with immediate effect by removing `action` parameter form url, as it dose'nt need a submit button or save seedings.  It also supports bulk subscribe/un-subscribe using `subscribe_all` or `unsubscribe_all` params for all portfolios at once. and it also supports sending email to user confirming the subscription or un-subscription.
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: email
 *        description: The email of the user, if you are creating email un-subscription link, you need to pass this parameter, as it will be used to authenticate the user instead of headers unsubscribe_secret .
 *        type: string
 *        minimum: 1
 *        example: sherif.butt@gaia-lens.com
 *      - in: query
 *        name: first_name
 *        description: The first name of the user (optional), will be used in the email confirmation to address the user, Dear `<first_name>`,
 *        type: string
 *        minimum: 1
 *        example: Sherif
 *      - in: query
 *        name: portfolio_name
 *        description: The portfolio name of the user
 *        type: string
 *        minimum: 1
 *        example: new_001
 *      - in: query
 *        name: user_id
 *        type: string
 *        required: true
 *        minimum: 1
 *        description: The user id of the user
 *        example: 106
 *      - in: query
 *        name: subscription_type_id
 *        description: The subscription type id that user is un-subscribing from. `1` = controversies, `2` = price update ... etc
 *        type: integer
 *        minimum: 1
 *        default: 1
 *      - in: query
 *        name: portfolio_id
 *        type: integer
 *        required: true
 *        minimum: 1
 *        description: The portfolio id of the user
 *        example: 133
 *      - in: query
 *        name: subscribe_all
 *        description: The flag to subscribe all portfolios of the user
 *        type: boolean
 *        default: false
 *        schema:
 *         type: boolean
 *      - in: query
 *        name: html
 *        description: The flag to return html response, if not set to true it will return json response '`true` = returns html body to display on ether clients browser or emil `false` = returns json response'
 *        type: boolean
 *        default: false
 *        schema:
 *         type: boolean
 *      - in: header
 *        name: unsubscribe_secret
 *        description: The crypto secure uuid that is stored in the database and is used to authenticate the user, if you are creating in site or offsite un-subscription link, you need to pass this parameter, as it will be used to authenticate the user instead of headers unsubscribe_secret .
 *        type: string
 *     responses:
 *      200:  # success response
 *       description: Expected response to a valid request, Subscription updated successfully
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            success:
 *             type: boolean
 *             example: true
 *             required: true
 *            status:
 *             type: integer
 *             enum: [200,201]
 *             example: 200
 *            message:
 *             type: string
 *             example: Subscription updated successfully
 *        text/html:
 *         schema:
 *           type: string
 *           summary: html body to display on ether clients browser or emil
 *           example: <html><body><h1>Un-subscription updated successfully!</h1></body></html>
 *      400:  # bad request
 *       description: bad request, Subscription not updated
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            success:
 *             type: boolean
 *             example: false
 *             required: true
 *            status:
 *             type: integer
 *             enum: [400,500]
 *             example: 400
 *            error:
 *             type: string
 *             example: Subscription not updated!
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    email,
    first_name,
    portfolio_name,
    unsubscribe_all = req.query.unsubscribe_all || false,
    user_id,
    subscription_type_id = 1,
    html = false,
  }: any = req.query;

  let { portfolio_id } = req.query;

  try {
    // if (email && !/@/.test(email)) throw new Error("No user email found!");

    if (!portfolio_id && !unsubscribe_all)
      throw new Error("No portfolio id found!");

    if (unsubscribe_all) portfolio_id = null!;

    // check if email and  portfolio_id are valid and belongs to user
    const { rows: user }: any = await pgsql.query(
      email
        ? getUserByEmailAndOrPortfolioId(email, portfolio_id)
        : getUserByUserIdAndOrPortfolioId(user_id, portfolio_id)
    );

    if (!user[0])
      throw new Error(
        "Invalid email or portfolio id, please check your email and portfolio id and try again"
      );

    // toggle user's subscription status from false to true and vice versa based on action
    if (unsubscribe_all) {
      const { rows: updatePortfolio }: any = await pgsql.query(
        "UPDATE webapp.user_webapp_portfolio SET is_alert = false WHERE webapp.user_webapp_portfolio.user_id = " +
          user[0].user_id +
          " AND webapp.user_webapp_portfolio.collection_role_id = 1  ;"
      );
    } else {
      const { rows: updatePortfolio }: any = await pgsql.query(
        "UPDATE webapp.user_webapp_portfolio SET is_alert = false WHERE webapp.user_webapp_portfolio.portfolio_id = " +
          portfolio_id +
          " AND webapp.user_webapp_portfolio.collection_role_id = 1 ;"
      );
    }

    let successMessage;
    let emailSuccessMessage;
    const subject = "You have Unsubscribed!";
    const preheader = "You Have Unsubscribed From Controversy Alerts!";

    if (unsubscribe_all) {
      successMessage = `you've just unsubscribed successfully from All your portfolio controversy alerts at once, you will receive an email confirmation shortly!`;
      emailSuccessMessage = `You've just unsubscribed successfully from All your portfolio controversy alerts at once!`;
    } else {
      successMessage =
        "you've just unsubscribed successfully from your \"" +
        portfolio_name +
        '" portfolio at GaiaLens controversy alerts service! you will receive an email confirmation shortly!';
      emailSuccessMessage =
        "you've just unsubscribed successfully from your \"" +
        portfolio_name +
        '" portfolio at GaiaLens controversy alerts service!';
    }

    // send email to user confirming subscription or un-subscription
    const sentEmail = await sendAlertSettingUpdate(
      email,
      first_name,
      subject,
      preheader,
      emailSuccessMessage
    );

    res.status(200).send(
      html
        ? htmlWrapper(successMessage, subject)
        : {
            succuss: true,
            status: 200,
            message: successMessage,
          }
    );
  } catch (e: any) {
    res.status(400).json({
      success: false,
      error: e.message,
      status: 400,
    });
  }
}
