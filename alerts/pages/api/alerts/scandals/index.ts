import { NextApiRequest, NextApiResponse } from "next";

import { pgsql } from "../../../../lib/db";
import bulletPointsTemplate, {
  Body,
} from "../../../../util/serverSideHelpers/alerts/emailTemplates/bulletPointsTemplate";
import { getAllScandalsAndUsers } from "../../../../util/serverSideHelpers/alerts/sqlRawQuires";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get all users and scandals
    const { rows: usersAndScandals }: any = await pgsql.query(
      getAllScandalsAndUsers
    );
    if (!usersAndScandals) throw new Error("No users or scandals found!");

    // build messages array
    const messages: any[] = [];

    usersAndScandals?.map((user: any) => {
      // scandals array to hold all the scandals
      const scandals: any = [];
      const portfoliosData: any = [];

      // drill down to holdings and check if there is a scandal
      // step through portfolios
      user.portfolios?.map((portfolio: any) => {
        const scandal: any = [];

        // step through holdings
        portfolio.holdings?.map((holdings: any, holdingIndex: number) => {
          // if there is a scandal, push it to the scandal array
          if (holdings.scandal && holdings.scandal !== null)
            scandal.push(holdings.scandal);
        });

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

      // console.log(portfoliosData);

      // remove duplicates from scandals array
      const uniqueScandalsList = scandals.filter(
        (obj: any, index: number, self: any) => {
          return (
            index === self.findIndex((otherObj: any) => otherObj.id === obj.id)
          );
        }
      )[0];
      // to check if there is a scandal
      if (scandals.length) {
        const userInfo: {
          first_name: string;
          last_name: string;
          email: string;
        } = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
        // get the body of the email
        const emailBody = bulletPointsTemplate({
          userInfo,
          portfoliosData,
          uniqueScandalsList,
        });
        // check if there is a emailBody
        if (emailBody) {
          const { TextPart, HTMLPart }: Body = emailBody;
          console.log("TextPart", TextPart);
          messages.push({
            To: [
              {
                Email: userInfo.email,
                Name: userInfo.first_name + " " + userInfo.last_name,
              },
            ],
            // "scandals": uniqueScandalsList,
            TextPart,
            HTMLPart,
          });
        }
      }
    });

    res.status(200).json(messages);
    // res.status(200).json(usersAndScandals);
  } catch (e: any) {
    console.error(e.message);
    res
      .status(400)
      .send({ success: false, error: e, status: 400, message: e.message });
  }
}
