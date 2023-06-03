import { randomUUID } from "crypto";
import { pgsql } from "../../../lib/db";
import singularToPlural from "../../singularToPlural";
import bulletPointsTemplate, {
   Body,
} from "./emailTemplates/bulletPointsTemplate";
import generateSecureHex from "./generateSecureHex";
import {
   getAllScandalsAndUsers,
   getAllUsersAndSubscriptionType,
} from "./sqlRawQuires";

export type UserInfo = {
   user_id: number;
   first_name: string;
   last_name: string;
   email: string;
   unsubscribe_secret: string;
   email_id: string;
   hostURL: string;
};

/**
 *  Server Side Asynchronous function that composes the email messages for each user, and returns an array of arrays for concatenating an
 *  insert query for the database or an array of objects to be used for sending emails or both as
 *  an object with two properties messagesArrays and messagesObjects, option 2 is the default
 * @async
 * @function
 * @param {string} hostURL the host name of the server
 * @param {number|null} subscription_type_id  Type of alert service (1 = `scandals`, 2 = `earnings`, 3 = `dividends` .. etc)
 * @param {number|null} return_type  Type of return (0= `array` of arrays, 1= `array` of objects, 2= `object`
 * @param {string | null} template Current default template is /util/serverSideHelpers/alerts/emailTemplates/bulletPointsTemplate.ts
 *  with both array of arrays and array of objects) an array of arrays is used for concatenating an
 * insert query for the database
 * @returns {string[]|object[]}  Array of strings or objects
 * @example
 * // returns an array of arrays for concatenating an insert query for the database
 * composeEmailMessages("https://www.example.com", 1, 0, bulletPointsTemplate);
 * // returns an array of objects to be used for sending emails
 * composeEmailMessages("https://www.example.com", 1, 1, bulletPointsTemplate);
 * // returns an object with two properties messagesArrays and messagesObjects
 * composeEmailMessages("https://www.example.com", 1, 2, bulletPointsTemplate);
 * @mermaid 
  sequenceDiagram
    participant Client
    participant Function
    participant Database
    participant Template
    participant MessageArrays
    participant MessageObjects
    Client->>Function: composeEmailMessages
    activate Function
    Function->>Database: getAllScandalsAndUsers
    activate Database
    Database-->>Function: usersAndScandals
    deactivate Database
    Function->>Function: Map through usersAndScandals
    Function->>Function: Check scandals, create email_id, unsubscribe_secret
    Function->>Template: Get emailBody from template
    activate Template
    Template-->>Function: Return emailBody
    deactivate Template
    Function->>MessageArrays: Push details to MessageArrays (if return_type is 0 or 2)
    activate MessageArrays
    deactivate MessageArrays
    Function->>MessageObjects: Push details to MessageObjects (if return_type is 1 or 2)
    activate MessageObjects
    deactivate MessageObjects
    Function-->>Client: Return Messages (based on return_type)
    deactivate Function
 * @mermaid
graph TB
    A((Start)) --> B{Check hostURL}
    B -->|hostURL not defined| C(Set hostURL<br>based on NODE_ENV)
    B -->|hostURL defined| D(Get all users<br>and scandals)
    D --> E{Check if users<br>and scandals exist}
    E -->|No users/scandals| F(Throw Error)
    E -->|Users/Scandals exist| G(Map through<br>usersAndScandals)
    G --> H{Check if there<br>are scandals}
    H -->|No scandals| I(Skip user)
    H -->|Scandals exist| J(Generate email_id and<br>unsubscribe_secret)
    J --> K(Get emailBody<br>from template)
    K --> L{Check if there<br>is an emailBody}
    L -->|No emailBody| I
    L -->|emailBody exists| M(Add details to<br>messagesArrays if<br>return_type is 0 or 2)
    M --> N(Add details to<br>messagesObjects if<br>return_type is 1 or 2)
    N --> O{Check return_type}
    O -->|return_type is 0| P(Return<br>messagesArrays)
    O -->|return_type is 1| Q(Return<br>messagesObjects)
    O -->|return_type is 2| R(Return both<br>messagesArrays and<br>messagesObjects)
    R --> S((End))
    P --> S
    Q --> S


 */

const composeEmailMessages = async (
   hostURL: any | null,
   subscription_type_id: number | null = 1,
   return_type: number | null = 2,
   template: any | null = bulletPointsTemplate
) => {
   if (!hostURL)
      hostURL =
         process.env.NODE_ENV === "production"
            ? process.env.HOST_URL_PROD
            : process.env.HOST_URL_DEV;
   hostURL = hostURL.includes("localhost")
      ? "http://" + hostURL
      : "https://" + hostURL;
   {
      try {
         // get all users and scandals
         const { rows: usersAndScandals }: any = await pgsql.query(
            getAllScandalsAndUsers
         );
         if (!usersAndScandals) throw new Error("No users or scandals found!");

         // build messages array
         // let messages: any[] = [];
         let messagesArrays: any[] = [];
         let messagesObjects: any[] = [];

         let messages = {
            messagesArrays,
            messagesObjects,
            count: 0,
         };

         usersAndScandals?.map((user: any) => {
            // scandals array to hold all the scandals
            let scandals: any = [];
            let portfoliosData: any = [];

            // drill down to holdings and check if there is a scandal
            // step through portfolios
            user.portfolios?.map((portfolio: any) => {
               let scandal: any = [];

               // step through holdings
              //  portfolio.holdings &&
                  portfolio.holdings?.map(
                     (holding: any, holdingIndex: number) => {
                        // if there is a scandal, push it to the scandal array
                        if (holding.scandal && holding.scandal !== null)
                           scandal.push(holding.scandal);
                     }
                  );
              //  !portfolio.holdings && scandals.push([]);

               // if there is a scandal, push it to the scandals array
               if (portfolio.is_scandal_alert && scandal.length > 0) {
                  scandals.push(scandal);

                  portfoliosData.push({
                     id: portfolio.id,
                     portfolio_name: portfolio.portfolio_name,
                     holdings: portfolio.holdings,
                  });
               }
            });
            // flatten the scandals array
            const flatScandals = scandals.flat();

            // remove duplicates from scandals array
            const uniqueScandalsList = flatScandals.filter(
               (obj: any, index: number, self: any) => {
                  return (
                     index ===
                     self.findIndex((otherObj: any) => otherObj.id === obj.id)
                  );
               }

            );

            // console.log(uniqueScandalsList); 
            // to check if there is a scandal
            if (scandals.length) {
               const email_id = randomUUID();
               const unsubscribe_secret: string =
                  process.env.UNSUBSCRIBE_SECRET || randomUUID(); // 32 random characters
               
               const userInfo: UserInfo = {
                  user_id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  unsubscribe_secret,
                  email_id,
                  hostURL,
               };

               // get the body of the email
               const emailBody = template({
                  userInfo,
                  portfoliosData,
                  uniqueScandalsList,
               });

               // check if there is a emailBody
               if (emailBody) {
                  const { TextPart, HTMLPart }: Body = emailBody;
                  const n: number = uniqueScandalsList.length;

                  // returns an array of arrays for concatenating an insert query for the database
                  if (return_type == 0 || return_type == 2) {
                     messagesArrays.push([
                        email_id,
                        userInfo.user_id, // user_id
                        userInfo.email, // recipient_email
                        subscription_type_id, // subscription_type_id
                        process.env.ALERTS_SENT_FROM || "noreply@gaia-lens.com", // sent_from
                        process.env.ALERTS_SENDER_NAME || "GaiaLens", // sender
                        process.env.ALERTS_REPLY_TO || "info@gaia-lens.com", // reply_to
                        // `${singularToPlural(n,"controversy")} alert for ${n} ${singularToPlural(n, "company")}!`, // subject
                        "GaiaLens controversy alerts", // subject
                        TextPart, // text part
                        HTMLPart, // html part
                        0, // track_id
                        0, // attempts
                        process.env.UNSUBSCRIBE_SECRET || unsubscribe_secret, // unsubscribe secret
                     ]);
                     // just return the array of arrays
                     messages.count = messagesArrays.length;
                     if (return_type == 0) return messagesArrays;
                  }

                  // returns an array of objects to be used for sending emails
                  if (return_type == 1 || return_type == 2) {
                     messagesObjects.push({
                        From: {
                           Email:
                              process.env.ALERTS_SENT_FROM ||
                              "noreply@gaia-lens.com",
                           Name: process.env.ALERTS_SENDER_NAME || "GaiaLens",
                        },

                        To: [
                           {
                              Email: userInfo.email,
                              Name:
                                 userInfo.first_name + " " + userInfo.last_name,
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
                           Email:
                              process.env.ALERTS_REPLY_TO ||
                              "support@gaia-lens.com",
                           Name:
                              process.env.ALERTS_REPLY_TO_NAME ||
                              "GaiaLens Support Team",
                        },
                        Subject: `GaiaLens controversy alerts`,
                        TextPart,
                        HTMLPart,
                        CustomID: email_id,
                        Headers: {
                           unsubscribe_secret:
                              process.env.UNSUBSCRIBE_SECRET ||
                              unsubscribe_secret,
                        },
                        SandboxMode: true,
                     });
                     // just return the array of objects
                     if (return_type == 1) return messagesObjects;
                  }
               }
            }
         });

         // returns an object with both array of arrays and array of objects

         return messages;
      } catch (err) {
         throw err;
      }
   }
};

export default composeEmailMessages;
