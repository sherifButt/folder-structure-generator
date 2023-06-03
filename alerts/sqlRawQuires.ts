import sqlValues from "./sqlValues";

/**
 * @module sqlRawQuires
 * @description This module contains raw sql queries used in the alerts service
 * @example
 * import { getAllScandalsAndUsers } from "./sqlRawQuires";
 * import { pgsql } from "../../../lib/db";
 * ...
 * const scandalsAndUsers = await pgsql.query(getAllScandalsAndUsers(1, 2));
 * @requires module:lib/db 
 */

/**
 *  This function is used to create a sql query string
 * @function
 * @param {String} x
 * @returns {String}  sql query string
 * @example
 * // returns sql query string
 * sql`SELECT * FROM users WHERE id = ${userId}`
 */
const sql: any = (x: any) => {
    return x.join("");
};

/**
 * This sql query returns all scandals and users with their portfolios,
 * holdings and scandals for each holding (used in the alerts service).
 * @const
 * @type {String}
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.users
 * <li>  webapp.user_webapp_portfolio
 * <li>  webapp.webapp_portfolio
 * <li>  webapp.webapp_portfolio_holdings
 * <li>  dashboard.dashboard_company_controversy_latest
 */
export const getAllScandalsAndUsers = sql`
SELECT DISTINCT ON (users.id, users.first_name, users.last_name, users.email) 
users.id, 
users.first_name, 
users.last_name, 
users.email, 
(SELECT Json_build_object('id', O.id, 'name', O.NAME) 
 FROM   webapp.org AS O 
 WHERE  O.id = users.org_id) AS ORG ,
Array_agg(Json_build_object(
          'id', webapp.user_webapp_portfolio.portfolio_id, 
          'portfolio_name', webapp.webapp_portfolio.NAME, 
          'is_scandal_alert', webapp.user_webapp_portfolio.is_alert ,
          'holdings', (SELECT   Array_agg( Json_build_object(
                    'id', webapp_portfolio_holdings.companyid, 
                    'company_name', webapp_portfolio_holdings.companyname,
                    'scandal', CASE  WHEN dashboard.dashboard_company_controversy_latest.title_clean IS NOT NULL 
                                  AND webapp.user_webapp_portfolio.is_alert IS NOT false 
                                  THEN  
                                    (Json_build_object(
                                                        'id', dashboard.dashboard_company_controversy_latest.news_id,
                                                        'publisher', dashboard.dashboard_company_controversy_latest.company,
                                                        'portfolio_name', webapp.webapp_portfolio.name, 
                                                        'company_name', webapp_portfolio_holdings.companyname,
                                                        'source_url', dashboard.dashboard_company_controversy_latest.source_url,
                                                        'url', dashboard.dashboard_company_controversy_latest.url,
                                                        'title', dashboard.dashboard_company_controversy_latest.title_clean
                                                        -- 'body_clean', dashboard.dashboard_company_controversy_latest.body_clean
                                                        ) 
                                    )
                                  ELSE null END 
                            )
            ) 
          FROM  webapp.webapp_portfolio_holdings 
          JOIN  dashboard.dashboard_company_controversy_latest 
          ON    webapp_portfolio_holdings.companyid = dashboard.dashboard_company_controversy_latest.companyid
          WHERE webapp_portfolio_holdings.portfolio_id =  webapp.user_webapp_portfolio.portfolio_id
          )
          )) AS PORTFOLIOS

      FROM webapp.users 
      JOIN webapp.user_webapp_portfolio 
      ON   users.id = user_webapp_portfolio.user_id 
      JOIN webapp.webapp_portfolio 
      ON   webapp_portfolio.id = user_webapp_portfolio.portfolio_id
GROUP  BY users.id, 
          users.first_name, 
          users.last_name, 
          users.email;
          `;

/**
 * this function should replace getAllScandalsAndUsers when upgrading to generic alert subscription service
 * @function
 * @param {number} subscription_type - 1 = `scandals`, 2 = `news` change alerts
 * @returns {String} SQL query
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.users
 * <li>  webapp.user_webapp_portfolio
 * <li>  webapp.webapp_portfolio
 * <li>  webapp.webapp_portfolio_holdings
 * <li>  dashboard.dashboard_company_controversy_latest
 * <li>  webapp.user_portfolio_subscription
 * <li>  webapp.subscription_type
 * @example
 * // returns sql query string
 * getAllScandalsAndUsers(1)
 * @mermaid
 * sequenceDiagram
    participant users as webapp.users
    participant user_webapp_portfolio as webapp.user_webapp_portfolio
    participant webapp_portfolio as webapp.webapp_portfolio
    participant user_portfolio_subscription as webapp.user_portfolio_subscription
    participant subscription_type as webapp.subscription_type
    participant webapp_portfolio_holdings as webapp.webapp_portfolio_holdings
    participant dashboard_company_controversy_latest as dashboard.dashboard_company_controversy_latest

    users->>user_webapp_portfolio: JOIN on users.id = user_webapp_portfolio.user_id
    user_webapp_portfolio->>webapp_portfolio: JOIN on webapp_portfolio.id = user_webapp_portfolio.portfolio_id
    webapp_portfolio->>user_portfolio_subscription: LEFT JOIN on user_portfolio_subscription.portfolio_id = user_webapp_portfolio.portfolio_id
    user_portfolio_subscription->>subscription_type: LEFT JOIN on user_portfolio_subscription.subscription_id = subscription_type.id
    webapp_portfolio->>webapp_portfolio_holdings: SELECT holdings where webapp_portfolio_holdings.portfolio_id =  user_webapp_portfolio.portfolio_id
    webapp_portfolio_holdings->>dashboard_company_controversy_latest: LEFT JOIN on webapp_portfolio_holdings.companyid = dashboard_company_controversy_latest.companyid
    users->>+users: GROUP BY users.id, users.first_name, users.last_name, users.email
    users-->>-users: SELECT DISTINCT ON
  @mermaid
  graph TB
    users[webapp.users]
    user_webapp_portfolio[webapp.user_webapp_portfolio]
    webapp_portfolio[webapp.webapp_portfolio]
    user_portfolio_subscription[webapp.user_portfolio_subscription]
    subscription_type[webapp.subscription_type]
    webapp_portfolio_holdings[webapp.webapp_portfolio_holdings]
    dashboard_company_controversy_latest[dashboard.dashboard_company_controversy_latest]
    users-->user_webapp_portfolio
    user_webapp_portfolio-->webapp_portfolio
    webapp_portfolio-->user_portfolio_subscription
    user_portfolio_subscription-->subscription_type
    webapp_portfolio-->webapp_portfolio_holdings
    webapp_portfolio_holdings-->dashboard_company_controversy_latest


 */
export const getAllUsersAndSubscriptionType = (subscription_type: number = 1): string =>
    sql`
SELECT DISTINCT ON (users.id, users.first_name, users.last_name, users.email) 
users.id, 
users.first_name, 
users.last_name, 
users.email, 
(SELECT Json_build_object('id', O.id, 'name', O.NAME) 
 FROM   webapp.org AS O 
 WHERE  O.id = users.org_id) AS ORG ,
Array_agg(Json_build_object(
  
          'id', webapp.user_webapp_portfolio.portfolio_id, 
          'portfolio_name', webapp.webapp_portfolio.NAME,
          'subscription_type', webapp.subscription_type.key_name,
          'is_scandal_alert', CASE WHEN webapp.user_portfolio_subscription.is_subscribed IS NULL THEN false ELSE webapp.user_portfolio_subscription.is_subscribed END,
          
          'holdings', (SELECT   Array_agg( Json_build_object(
                    'id', webapp_portfolio_holdings.companyid, 
                    'company_name', webapp_portfolio_holdings.companyname,
                    'scandal', CASE  WHEN dashboard.dashboard_company_controversy_latest.title_clean IS NOT NULL 
                                  AND webapp.user_portfolio_subscription.is_subscribed IS true 
                                  THEN  
                                    (Json_build_object(
                                                        'id', dashboard.dashboard_company_controversy_latest.news_id,
                                                        'publisher', dashboard.dashboard_company_controversy_latest.company,
                                                        'portfolio_name', webapp.webapp_portfolio.NAME, 
                                                        'company_name', webapp_portfolio_holdings.companyname,
                                                        'source_url', dashboard.dashboard_company_controversy_latest.source_url,
                                                        'url', dashboard.dashboard_company_controversy_latest.url,
                                                        'title', dashboard.dashboard_company_controversy_latest.title_clean
                                                        -- 'body_clean', dashboard.dashboard_company_controversy_latest.body_clean
                                                        ) 
                                    )
                                  ELSE null END 
                            )
          ) 
          FROM   webapp.webapp_portfolio_holdings 
          left JOIN dashboard.dashboard_company_controversy_latest 
          ON webapp_portfolio_holdings.companyid = dashboard.dashboard_company_controversy_latest.companyid
          WHERE  webapp_portfolio_holdings.portfolio_id =  webapp.user_webapp_portfolio.portfolio_id
          )
          )) AS PORTFOLIOS

FROM   webapp.users 
       JOIN webapp.user_webapp_portfolio 
         ON users.id = user_webapp_portfolio.user_id 
       JOIN webapp.webapp_portfolio 
         ON webapp_portfolio.id = user_webapp_portfolio.portfolio_id
  LEFT JOIN webapp.user_portfolio_subscription
         ON webapp.user_portfolio_subscription.portfolio_id = webapp.user_webapp_portfolio.portfolio_id
  LEFT JOIN webapp.subscription_type
         ON webapp.user_portfolio_subscription.subscription_id = webapp.subscription_type.id
      WHERE webapp.subscription_type.id = ` +
    subscription_type +
    sql`
      GROUP  BY users.id, 
                users.first_name, 
                users.last_name, 
                users.email;
                `;
/**
 * This sql query returns a single user and their portfolios using the user's email
 * @function
 * @param {string} email - user's email address 
 * @returns {String} SQL query
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.users
 * @example
 * // returns sql query string
 * getUserByEmail('user-email@gmail.com')
 */
export const getUserByEmail: any = (email: any) =>
    "select * from webapp.users WHERE webapp.users.email = '" + email + "';";

/**
 *  This sql query returns a single user and their portfolios using the user's email and/or portfolio id
 * @function
 * @param {string} email - user's email
 * @param {number} portfolio_id - portfolio id
 * @returns  {String} SQL query 
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.users
 * <li>  webapp.user_webapp_portfolio
 * <li>  webapp.webapp_portfolio
 * @example
 * // returns sql query string
 * getUserByEmailAndOrPortfolioId('users-email@gmail.com','105');
 */
export const getUserByEmailAndOrPortfolioId: any = (email: string, portfolio_id: number) => {
    if (email && portfolio_id)
        return (
            "SELECT * from webapp.users join webapp.user_webapp_portfolio ON user_webapp_portfolio.user_id = users.id " +
            "WHERE users.email = '" +
            email +
            "' AND user_webapp_portfolio.portfolio_id = " +
            portfolio_id +
            ";"
        );
    if (email && !portfolio_id)
        return (
            "SELECT * from webapp.users join webapp.user_webapp_portfolio ON user_webapp_portfolio.user_id = users.id " +
            "WHERE users.email = '" +
            email +
            "';"
        );
    if (!email && portfolio_id)
        return (
            "SELECT * from webapp.users join webapp.user_webapp_portfolio ON user_webapp_portfolio.user_id = users.id " +
            "user_webapp_portfolio.portfolio_id = " +
            portfolio_id +
            ";"
        );
};

/**
 *  This sql query returns a single user and their portfolios using the user's id and portfolio id
 * @function
 * @param {string} id - user's id
 * @param {number} portfolio_id - portfolio id
 * @returns  {String} SQL query
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.users
 * <li>  webapp.user_webapp_portfolio
 * <li>  webapp.webapp_portfolio
 * @example
 * // returns sql query string
 * getUserByUserIdAndOrPortfolioId('1','105');
 *
 */
export const getUserByUserIdAndOrPortfolioId: any = (id: string, portfolio_id: number) => {
    if (id && portfolio_id)
        return (
            "SELECT * from webapp.users join webapp.user_webapp_portfolio ON user_webapp_portfolio.user_id = users.id " +
            "WHERE users.id = '" +
            id +
            "' AND user_webapp_portfolio.portfolio_id = " +
            portfolio_id +
            ";"
        );
    if (id && !portfolio_id)
        return (
            "SELECT * from webapp.users join webapp.user_webapp_portfolio ON user_webapp_portfolio.user_id = users.id " +
            "WHERE users.id = '" +
            id +
            "';"
        );
    if (!id && portfolio_id)
        return (
            "SELECT * from webapp.users join webapp.user_webapp_portfolio ON user_webapp_portfolio.user_id = users.id " +
            "user_webapp_portfolio.portfolio_id = " +
            portfolio_id +
            ";"
        );
};

/**
 * This sql query returns a single user and their portfolios using the user's id
 * @function
 * @type {String}
 * @param {string} portfolio_id - portfolio id
 * @param {number} action - action to be taken on the portfolio, 1 for `track`, 0 for `untrack`, 2 for `delete`
 * @returns {String} SQL query 
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.user_webapp_portfolio
 * @example
 * // returns sql query string
 * updatePortfolioAlert('105','1');
 */
export const updatePortfolioAlert: any = (portfolio_id: number, action: number) =>
    "UPDATE webapp.user_webapp_portfolio SET track_id = " +
    !!+action +
    " WHERE webapp.user_webapp_portfolio.portfolio_id = " +
    portfolio_id +
    " ;";

/**
 * This sql query returns unsent emails from the email queue
 * @constant
 * @type {String}
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.notifications_email_queue
 * <li>  webapp.users
 */
export const getUnsentEmailsQueue: any = sql`
SELECT 

users.id,
users.first_name,
users.last_name,
users.email,
notifications_email_queue.id as email_id,
notifications_email_queue.created_at,
notifications_email_queue.updated_at,
notifications_email_queue.sent_at,
notifications_email_queue.subscription_type_id,
notifications_email_queue.subject,
notifications_email_queue.text_part,
notifications_email_queue.html_part,
notifications_email_queue.track_id,
notifications_email_queue.unsubscribe_secret
FROM webapp.notifications_email_queue
JOIN webapp.users ON users.id = notifications_email_queue.user_id
WHERE track_id = 0;
`;

/**
 * This sql query INSERT INTO `webapp.notifications_email_queue` table,
 * @function
 * @type {String}
 * @param {string[]} messagesArray - array of arrays of values to be inserted
 * @returns  {String} SQL query
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.notifications_email_queue
 * @example
 * // returns sql query string
 * insertEmailMessagesToQueueTable(
 *   [
 *     ['1','1','0','1','1','1','1','1','1','1','1','1','1']
 *   ]
 * );
 */
export const insertEmailMessagesToQueueTable: any = (messagesArray: string[] = []): string =>
    `INSERT INTO webapp.notifications_email_queue (id,user_id,recipient_email,subscription_type_id,sent_from,sender,reply_to,subject,text_part,html_part,track_id,attempts,unsubscribe_secret) VALUES ${sqlValues(
        messagesArray
    )} ON CONFLICT (text_part) DO NOTHING;`;

/**
 * INSERT INTO `webapp.notifications_email.log` table
 * @function
 * @param {String[]} messagesArray messagesArray array of arrays of values to be inserted
 * @returns {String} SQL query
 * @tutorial This query is used in the alerts service, it wil join the following tables:
 * <ol >
 * <li>  webapp.notifications_email_log
 * @example
 * // returns sql query string
 * insertIntoEmailLogTable(
 *    [ 
 *      ['1','1','0','1','1','1','1','1','1','1','1','1','1']
 *   ]
 *  );
 */
export const insertIntoEmailLogTable: any = (messagesArray: string[] = []): string =>
    `INSERT INTO webapp.notifications_email_log (email_id,user_id, track_type_id, agent_message_uuid, agent_message_id,agent_message_href,error_id,error_code,error_message,error_related_to) VALUES ${sqlValues(
        messagesArray
    )};`;
    
/**
 * This sql query updates the `webapp.notifications_email_queue` table, setting `track_id` to 
 * 1 and attempts to `attempts+1`, and `sent_at` to NOW()
 * @constant
 * @type {String}
 */
export const updateEmailQueueTable: any = `UPDATE webapp.notifications_email_queue 
   SET track_id=1,attempts = attempts+1 ,sent_at= NOW(),updated_at= NOW() 
   WHERE track_id=0;
  `;
