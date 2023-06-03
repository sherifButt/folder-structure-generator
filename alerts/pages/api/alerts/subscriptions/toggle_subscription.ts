import { NextApiRequest, NextApiResponse } from "next";

import { pgsql } from "../../../../lib/db";
import { sendAlertSettingUpdate } from "../../../../lib/mail";
import {
  getUserByEmailAndOrPortfolioId,
  getUserByUserIdAndOrPortfolioId,
} from "../../../../util/serverSideHelpers/alerts/sqlRawQuires";

/**
 * @swagger
 * /api/alerts/subscriptions/toggle_subscription:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Toggle subscription
 *     description:
 *        Managing the subscription toggle, this feature allows users to quickly and easily switch their subscription state between active and inactive by simply hitting the endpoint. via both `email` and `portfolio_id`. </br>
 *        <h1>Features:</h1>
 *        <ol>
 *        <ul>Reverses subscription state per portfolio.</ul>
 *        </ol>
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: email
 *        description: Users email, you need to pass this parameter if you are creating email toggling link, as it will be used to authenticate the user instead of headers `unsubscribe_secret` .
 *        type: string
 *        required: true
 *        example: sherif.butt@gaia-lens.com
 *      - in: query
 *        name: user_id
 *        type: string
 *        required: true
 *        minimum: 1
 *        description: The user id of the user
 *        example: 106
 *      - in: query
 *        name: portfolio_id
 *        type: integer
 *        required: true
 *        minimum: 1
 *        description: The portfolio id of the user
 *        example: 133
 *      - in: query
 *        name: subscription_type_id
 *        description: The subscription type id that user is un-subscribing from. `1` = controversies, `2` = price update ... etc
 *        type: integer
 *        minimum: 1
 *        default: 1
 *      - in: query
 *        name: first_name
 *        description: The first name of the user (optional), will be used in the email confirmation to address the user, Dear `<first_name>`,
 *        type: string
 *        example: Sherif
 *      - in: query
 *        name: portfolio_name
 *        description: The portfolio name of the user
 *        type: string
 *        minimum: 1
 *        example: new_001
 *      - in: query
 *        name: subscribe_all
 *        description: The flag to subscribe or un-subscribe all portfolios at once. `true` = subscribe all, `false` = un-subscribe all
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
    user_id,
    portfolio_name,
    unsubscribe_all = req.query.unsubscribe_all || false,
    subscribe_all = req.query.subscribe_all || false,
    subscription_type_id = 1,
  }: any = req.query;

  let { portfolio_id, action }: Record<string, any> = req.query;
  console.log(req.query);
  try {
    if (!portfolio_id) throw new Error("No portfolio id found!");

    if (unsubscribe_all || subscribe_all) portfolio_id = null!;

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

    // if no action is provided toggle user's subscription status from false to true and vice versa
    // !true = false and +true = 1 +false = 0
    if (!action) action = +!user[0].is_alert;
    if (unsubscribe_all) action = 0;
    if (subscribe_all) action = 1;

    // toggle user's subscription status from false to true and vice versa based on action
    if (unsubscribe_all || subscribe_all) {
      const { rows: updatePortfolio }: any = await pgsql.query(
        "UPDATE webapp.user_webapp_portfolio SET is_alert = " +
          !!+action +
          " WHERE webapp.user_webapp_portfolio.user_id = " +
          user[0].user_id +
          " AND webapp.user_webapp_portfolio.collection_role_id = 1;"
      );
    } else {
      console.log("to the db");
      const { rows: updatePortfolio }: any = await pgsql.query(
        "UPDATE webapp.user_webapp_portfolio SET is_alert = " +
          !!+action +
          " WHERE webapp.user_webapp_portfolio.portfolio_id = " +
          portfolio_id +
          " AND webapp.user_webapp_portfolio.collection_role_id = 1 ;"
      );
    }

    let successMessage;

    const subject = !+action
      ? "You have unsubscribed!"
      : "You have subscribed!";
    const preheader = !+action
      ? "You Have Unsubscribed To Controversy Alerts!"
      : "You Have Subscribed To Controversy Alerts!";

    if (unsubscribe_all || subscribe_all) {
      successMessage = `you've just ${
        !+action
          ? "unsubscribed successfully from All your portfolio controversy alerts at once!"
          : "subscribed successfully to All your portfolio controversy alerts at once!"
      }`;
    } else {
      successMessage = `you've just ${
        !+action
          ? 'unsubscribed successfully from "' +
            portfolio_name +
            '" portfolio controversy alerts'
          : 'subscribed successfully to "' +
            portfolio_name +
            '" portfolio controversy alerts'
      }`;
    }

    // send email to user confirming subscription or un-subscription
    const sentEmail = await sendAlertSettingUpdate(
      user[0].email || email,
      user[0].first_name || first_name,
      subject,
      preheader,
      successMessage
    );

    res.status(200).json({
      succuss: true,
      status: 200,
      message: successMessage,
    });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({
      success: false,
      error: e.message,
      status: 400,
    });
  }
}
