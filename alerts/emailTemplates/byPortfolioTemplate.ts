/**
 * textPart template to generate scandal email to users, this template is used to generate the html part of the email.
 * @function
 * @description app.js
 * @param {object} emailData - email variables that will be inserted into the email
 * @param {object} emailData.userInfo - userInfo information
 * @param {array} emailData.portfoliosNames - userInfo information
 * @param {array} emailData.uniqueScandalsList - userInfo information
 * @returns {string} template string containing userInfo information, scandals information and unsubscribe links.
 * @example
 * // returns a string
 * textPart({
    userInfo: {
        first_name: "John",
        last_name: "Doe",
        email: "",
    },
    portfoliosNames: ["UK Alpha", "UK Alpha 2"],
    portfoliosData: [
        {
            portfolio_name: "UK Alpha",
            holdings: [{ company_name: "Company 1", scandal: { title: "Scandal 1" } }],
        },
    ],
    uniqueScandalsList: [
        { title: "Scandal 1", company_name: "Company 1", publisher: "Publisher 1" },
    ],
 * });
 */

export const textPart = ({ userInfo, portfoliosNames, portfoliosData, uniqueScandalsList }: any) =>
    `
    Dear ${userInfo.first_name},
    
    Your ESG portfolio${portfoliosData.length > 1 ? "s: " : ""} ${portfoliosData
        ?.map(
            (portfolio: any, idx: number) =>
                portfolio.portfolio_name + (idx == portfoliosData.length - 2 ? " and " : ", ")
        )
        .join("")}have triggered a scandal  alert:
    ${uniqueScandalsList
        .map(
            (scandal: any, idx: number) =>
                `\n ${portfoliosData.length > 1 && idx + 1}- ${scandal.title} -${
                    scandal.company_name
                }- By, ${scandal.publisher}.`
        )
        .join("")}
    
    View ${
        uniqueScandalsList.length > 1 ? "full aricles" : "the full article"
    } from this link: https://app.gaialens.com/dashboard
    
    ---
    Best regards,
    Gaia Lens Team
    
    This email is sent to you by the Gaia Lens ESG LTD, scandal detector service, as you subscribed to the scandal alerts.
    You can unsubscribe from the service by clicking on the link below.
    https://app.gaialens.com/api/v1/scandals/unsubscribe/${userInfo.email}
    `;


/**
 * htmlPart template to generate scandal email to users, this template is used to generate the html part of the email.
 * @function
 * @description app.js
 * @param {object} emailData - email variables that will be inserted into the email
 * @param {object} emailData.userInfo - userInfo information
 * @param {array} emailData.portfoliosNames - userInfo information
 * @param {array} emailData.uniqueScandalsList - userInfo information
 * @returns {string} template string containing userInfo information, scandals information and unsubscribe links.
 * @example
 * // returns a string
 * htmlPart({
    userInfo: {
        first_name: "John",
        last_name: "Doe",
        email: "",
    },
    portfoliosNames: ["UK Alpha", "UK Alpha 2"],
    portfoliosData: [
        {
            portfolio_name: "UK Alpha",
            holdings: [{ company_name: "Company 1", scandal: { title: "Scandal 1" } }],
        },
    ],
    uniqueScandalsList: [
        { title: "Scandal 1", company_name: "Company 1", publisher: "Publisher 1" },
    ],
 * });
 */
export const htmlPart = ({ userInfo, portfoliosNames, portfoliosData, uniqueScandalsList }: any) =>
    `<p>Dear ${userInfo.first_name},</p>` +
    `<p>Your ESG portfolio${portfoliosData.length > 1 ? "s: " : " "} ${portfoliosData?.map(
        (portfolio: any, idx: number) => {
            if (idx < portfoliosData.length - 1) return portfolio.portfolio_name;
        }
    )} ${portfoliosData.length > 1 && "and"} ${
        portfoliosNames[portfoliosData.length - 1]
    } have triggered a scandal alert:</p>` +
    `<ul>` +
    `${portfoliosData
        ?.map(
            (portfolio: any, portfolioIdx: number) =>
                `<li>${portfolio.portfolio_name} > ${
                    portfolio.holdings[portfolioIdx].company_name
                }: <ol> ${portfolio.holdings
                    .map(
                        (holding: any, holdingIdx: number) => `<li>${holding?.scandal?.title}</li>`
                    )
                    .join("")}  <ol></li>`
        )
        .join("")}` +
    `</ul>` +
    `<ul>` +
    `<li>UK Alpha &gt; Alphabet Inc :&nbsp;` +
    `<ol>` +
    `<li>at velit eu est congue elementum in -Alphabet Inc.- By, New York Times.</li>` +
    `<li>et ultrices posuere cubilia curae nulla -Alphabet Inc.- By, ICICI Bank.</li>` +
    `</ol>` +
    `</li>` +
    `}` +
    `</ul>` +
    `<p>Please dont hesitate to contact us if any further assestance is neede.</p>` +
    `<p>---</p>` +
    `<p>Best regards,</p>` +
    `<p>Gaia Lens Team</p>` +
    `<p>This email is sent to you by the Gaia Lens LTD ESG, scandal detector service, as you subscribed to the scandal alerts.</p>` +
    `<p>You can unsubscribe from following any of the portfolios by clicking:&nbsp;<a href="\">unfollow Big Oil</a>&nbsp;, <a href="\">unfollow UK Alpha</a>&nbsp;, <a href="F">unfollow FANG</a>&nbsp;, <a href="\">unfollow No Scandal Portfolio</a>&nbsp;or&nbsp;<a href="\">unfollow Big Tech</a>&nbsp;</p>` +
    `<p>Dear ${userInfo.first_name},</p>` +
    `<ol>` +
    uniqueScandalsList
        .map((scandal: any, idx: number) => {
            if (scandal != ",")
                return `<li>${scandal.title} -${scandal.company_name}- By, ${scandal.publisher}.</li>`;
        })
        .join("") +
    `</ol>` +
    `<p>View ${
        uniqueScandalsList.length > 1 ? "fullaricles" : "the full article"
    } from this link: https://app.gaialens.com/dashboard</p>` +
    `<br>` +
    `<p>This email is sent to you by the Gaia Lens LTD ESG, scandal detector service, as you subscribed to the scandal alerts.</p>` +
    `<br>` +
    `<p>---</p>` +
    `<p>Best regards,</p>` +
    `<p>Gaia Lens Team</p>` +
    `<p>You can unsubscribe from the service by clicking on the <a href="https://app.gaialens.com/api/v1/scandals/unsubscribe/${userInfo.email}" alt="unsbscribe from scandel alerts">unsubscribe</a> or copy this link https://app.gaialens.com/api/v1/scandals/unsubscribe/${userInfo.email} </p>`;
