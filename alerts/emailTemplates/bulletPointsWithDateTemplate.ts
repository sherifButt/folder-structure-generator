import { GetServerSideProps, NextPage } from "next";
import singularToPlural from "../../../singularToPlural";
import numberToWord from "../../../numberToWord";
import { UserInfo } from "../composeEmailMessages";

/**
 * This is a template to generate controversy email to users, it is used in the app.js
 * file in the sendEmail function to generate the email body in the text part of the email
 * and in the html part of the email.
 * @function
 * @description app.js 
 * @param {Object} emailData - email variable that will be inserted into the email
 * @param {Object} emailData.userInfo - userInfo information
 * @param {array} emailData.portfoliosNames - userInfo information
 * @param {array} emailData.uniqueScandalsList - userInfo information
 * @returns {Object} body - object containing the `TextPart` and `HTMLPart` of the email
 * @returns {string} body.TextPart - template string containing userInfo information,
 *  scandals information and unsubscribe links in string format.
 * @returns {string} body.HTMLPart - template string containing userInfo information,
 *  scandals information and unsubscribe links in html format.
 * @example
 * // returns string
 * bulletPointsTemplate({})
 * // returns string
 * bulletPointsTemplate({ userInfo, portfoliosData, uniqueScandalsList })
 * // returns string
 * bulletPointsTemplate({ userInfo: {}, portfoliosData: [], uniqueScandalsList: [] })
 */

export type Body = { TextPart: string | null; HTMLPart: string | null };

const bulletPointsTemplate = ({
  userInfo = {},
  portfoliosData = [],
  uniqueScandalsList = [],
}: any): Body => {
  let body: Body = {
    TextPart: null,
    HTMLPart: null,
  };

  // to avoid looping through any of the arrays if they are empty
  if (
    !Object.keys(userInfo).length ||
    !portfoliosData.length ||
    !uniqueScandalsList.length
  )
    return body;

  // const userInfo.hostURL = process.env.NODE_ENV === "production" ? process.env.HOST_URL_PROD : process.env.HOST_URL_DEV;
  const n: number = uniqueScandalsList.length;
  const n_: any = n > 1 ? n : "a";
  const have: string = n > 1 ? "have" : "has";
  const s: string = n > 1 ? "s" : "";
  const is: string = n > 1 ? "are" : "is";
  const a: string = n > 1 ? "" : "a";
  /**
   * Singular or plural for alert type ie:(controversy or controversies)
   * @param form - words form (0=singular or 1=plural)
   * @returns {string} - the word in the correct form
   */
  const typeName = (form: number | null): string => {
    if (form === 0) return "controversy"; // in v1.2 we will have more types of alerts
    if (form === 1) return "controversies";
    return n > 1 ? "controversies" : "controversy";
  };
  const date = new Date().toDateString();

  // build the text part of the email
  body.TextPart = `
  Dear ${userInfo.first_name},
   
  We hope this email finds you well. We are writing to inform you that your ESG portfolio${
    portfoliosData.length > 1 ? "s: " : ""
  } ${portfoliosData
    ?.map(
      (portfolio: any, idx: number) =>
        portfolio.portfolio_name +
        (idx == portfoliosData.length - 2 ? " and " : ", ")
    )
    .join("")}${
    portfoliosData.length > 1 ? "have" : "has"
  } triggered ${numberToWord(n_)} controversy alert${singularToPlural(
    n,
    "s"
  )} as of today ${date}:
    ${uniqueScandalsList
      ?.map(
        (scandal: any, idx: number) =>
          `\n ${uniqueScandalsList.length > 1 && idx + 1}- ${scandal.title} -${
            scandal.company_name
          }- By, ${scandal.publisher}.`
      )
      .join("")}
    
    View ${
      uniqueScandalsList.length > 1 ? "full articles" : "the full article"
    } from this link: ${userInfo.hostURL}/portfolio/esg-news#table-tt

    We understand the importance of staying informed about any ${typeName(
      1
    )} related to your investments, and we want to assure you that our GaiaLens Team is here to assist you with any additional information or clarification that you may need.
    Please do not hesitate to contact us if you require any additional assistance.
    
    ---
    Best regards,
    The GaiaLens Team, ${date}
   
    As a reminder, This email is from the GaiaLens LTD ESG Controversy Detector Service, which you have subscribed to receive updates on ${typeName(
      1
    )} alerts related to your portfolios.
    You have the option to unsubscribe from receiving updates on specific portfolios by clicking the link below: ${portfoliosData
      ?.map(
        (portfolio: any, idx: number) =>
          `\n- Stop following ${portfolio.portfolio_name} : ${
            userInfo.hostURL
          }/api/alerts/subscriptions/unsubscribe?email=${
            userInfo.email
          }?portfolio_id=${
            portfolio.id
          }&portfolio_name=${portfolio.portfolio_name.replace(
            " ",
            "%20"
          )}&action=0&first_name=${userInfo.first_name}&user_id=${
            userInfo.user_id
          }&html=true`
      )
      .join("")}`;

  // build the html part of the email
  body.HTMLPart =
    `<p>Dear ${userInfo.first_name},</p>` +
    `<p>We hope this email finds you well. We are writing to inform you that your ESG portfolio${
      portfoliosData.length > 1 ? "s: " : ""
    } ${portfoliosData
      ?.map(
        (portfolio: any, idx: number) =>
          portfolio.portfolio_name +
          (idx == portfoliosData.length - 2 ? " and " : ", ")
      )
      .join("")} ${have} triggered ${numberToWord(n_)} ${typeName(
      null
    )} alert${s} as of today ${date}:</p>` +
    `<ol>` +
    uniqueScandalsList
      ?.map((scandal: any, idx: number) => {
        if (scandal != ",")
          return `<li><a href='${userInfo.hostURL}/portfolio/esg-news#table-tt'><strong>${scandal.title}</strong>- <span style='font-size:.7rem'><em>${scandal.company_name}- By, ${scandal.publisher}</em></span>.</a></li>`;
      })
      .join("") +
    `</ol>` +
    `<br>` +
    `<p>We understand the importance of staying informed about any ${typeName(
      1
    )} related to your investments, and we want to assure you that our GaiaLens Team is here to assist you with any additional information or clarification that you may need.</p>` +
    `<p>Please do not hesitate to contact us if you require any additional assistance.</p>` +
    `<p>---</p>` +
    `<p>Best regards,</p>` +
    `<p><a href='${userInfo.hostURL}'>The GaiaLens Team</a>, ${date}</p> ` +
    `<p>As a reminder, This email is from the GaiaLens LTD ESG Controversy Detector Service, which you have subscribed to receive updates on ${typeName(
      1
    )} alerts related to your portfolios.</p>` +
    `<p>You have the option to unsubscribe from receiving updates on specific portfolios by clicking:` +
    `${portfoliosData.length > 1 ? "s: " : ""} ${portfoliosData
      ?.map(
        (portfolio: any, idx: number) =>
          "<a href='" +
          userInfo.hostURL +
          "/api/alerts/subscriptions/unsubscribe?email=" +
          userInfo.email +
          "&portfolio_id=" +
          portfolio.id +
          "&portfolio_name=" +
          portfolio.portfolio_name.replace(" ", "%20") +
          `&action=0&first_name=${userInfo.first_name}&user_id=${userInfo.user_id}&html=true'>stop following ` +
          portfolio.portfolio_name +
          "</a>" +
          (idx == portfoliosData.length - 2 ? " or " : ", ") +
          `<img src="${userInfo.hostURL}/api/alerts/email/track?email_id=${userInfo.email_id}&recipient=${userInfo.user_id}" width="1" height="1" />`
      )
      .join("")}` +
    `Alternatively, you can unsubscribe from receiving all ${typeName(
      0
    )} alerts by clicking on: <a href='` +
    "<a href='" +
    userInfo.hostURL +
    "/api/alerts/subscriptions/unsubscribe?email=" +
    userInfo.email +
    "&unsubscribe_all=true&html=true'>" +
    `unsubscribe from All ${typeName(0)} alerts</a>.</p>`;

  return body;
};
export default bulletPointsTemplate;
