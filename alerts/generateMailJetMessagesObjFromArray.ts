import singularToPlural from "../../singularToPlural";

/**
 *  Generates an array of objects to be used for sending emails
 * @function
 * @param queue - array of objects with the following structure:
 * @returns array of objects
 * @example
 * // returns an array of objects to be used for sending emails
 * generateMailJetMessagesObjFromArray(queue);
 */
const generateMailJetMessagesObjFromArray = (queue: string[]): any => {
  const messagesObjects: any[] = [];
  const n: number = queue.length;

  queue?.map((message: any) => {
    messagesObjects.push({
      From: {
        Email: process.env.ALERTS_SENT_FROM || "noreply@gaia-lens.com",
        Name: process.env.ALERTS_SENDER_NAME || "GaiaLens",
      },

      To: [
        {
          Email: message.email,
          Name: message.first_name + " " + message.last_name,
        },
      ],
      TemplateErrorReporting: {
        Email:
          process.env.ALERTS_ERROR_REPORTING_TO ||
          "gordon.tveitoduncan@gaia-lens.com",
        Name: "Reporter",
      },
      TemplateLanguage: true,
      ReplyTo: {
        Email: process.env.ALERTS_REPLY_TO || "support@gaia-lens.com",
        Name: process.env.ALERTS_REPLY_TO_NAME || "GaiaLens Support Team",
      },
      Subject: message.subject,
      TextPart: message.text_part,
      HTMLPart: message.html_part,
      CustomID: message.email_id,
      Headers: {
        unsubscribe_secret:
          process.env.UNSUBSCRIBE_SECRET || message.unsubscribe_secret,
      },
      SandboxMode: true,
    });
  });
  return messagesObjects;
};
export default generateMailJetMessagesObjFromArray;
