import { NextApiRequest, NextApiResponse } from "next";

import { pgsql } from "../../../../lib/db";

/**
 * Track email opened emails by user, the api stores a log of the email opened by the user, and updates the database accordingly.
 * It also updates webapp.notifications.email.queue table to mark the email as opened. and updates the count.
 * @swagger
 * /api/alerts/email/track:
 *   get:
 *     tags: [Emails]
 *     summary: Tracking email opened emails by user
 *     description:
 *        Track email opened emails by user, the api stores a log of the email opened by the user, and updates the database accordingly.
 *        It also updates `webapp.notifications.email.queue` table to mark the email as opened. and updates the count.
 *        <h1>Features:</h1>
 *        <ol>
 *        <li>Track email opened emails by user.</li>
 *        <li>Stores a log of the email opened by the user, and updates the database accordingly.</li>
 *        <li>Updates `webapp.notifications.email.queue` table to mark the email as opened. and updates the count.</li>
 *        <li>Counts how many times email was opened and updates webapp.notifications.email.queue table.</li>
 *        </ol>
 *        <h1>Planned features v1.1:</h1>
 *        <ol>
 *        <li>support for subscription_type</li>
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: email_id
 *        description: secure Email ID, generated automatically and stored in `webapp.notifications.email.queue` table.
 *        type: string
 *        minimum: 1
 *        required: true
 *        example: e121f324-8d39-4480-a962-c3f111a41af2
 *      - in: query
 *        name: recipient
 *        type: string
 *        minimum: 1
 *        description: User id of the user who opened the email. used the flag name "recipient" instead of `user_id` to avoid getting user id getting exposed, as this tracking link could be used on many places over the internet.
 *        example: 106
 *     responses:
 *      200:  # success response
 *       description: OK
 *       content:
 *        image/gif:
 *         schema:
 *           type: file
 *           format: binary
 *           example: "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
 *      400:  # bad request
 *       description: bad request
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
 *             example: insert or update on table \"notification_email_track_log\" violates foreign key constraint
 */
const trackEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email_id, recipient: user_id } = req.query;

    // get users ip address
    let ip: any =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.connection.remoteAddress;
    if (!ip) ip = "00.00.00";

    // add email_id and ip to the database
    const addTrackingLog: any = await pgsql.query(
      `INSERT INTO webapp.notification_email_track_log (email_id, track_type_id, tracked_ip) VALUES ('${email_id}', 2, '${ip}')`
    );
    if (!addTrackingLog.rowCount) throw new Error("cannot add tracking log!");

    // update db, email queue table with email open count
    const updatedRows = await pgsql.query(
      `UPDATE webapp.notifications_email_queue SET track_id = 2, open_count = open_count + 1, updated_at= NOW() WHERE id = '${email_id}';`
    );
    if (!updatedRows.rowCount)
      throw new Error("cannot update email queue tables!");

    if (ip == "00.00.00") throw new Error("No ip address found!");

    // Return pixel
    res.setHeader("Content-Type", "image/gif");
    res
      .status(200)
      .end(
        new Buffer([
          0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80,
          0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
          0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44, 0x01,
          0x00, 0x3b,
        ])
      );
  } catch (e: any) {
    console.error(e);
    res.status(400).json({
      success: false,
      status: 400,

      error: e.message,
    });
  }
};

export default trackEmail;
