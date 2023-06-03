
type MessageResponse = {
  Status: string;
  CustomID: string;
  Email: string;
  MessageUUID: number;
  MessageID: number;
  MessageHref: string;
};
type MailJetResponse = MessageResponse[];

/**
 * extracts the response from MailJet and returns an array of MailJetResponse Objects or array of arrays, you can use it to update the database
 * @function
 * @param response MailJet response object
 * @param return_type 0 = array of arrays, 1 = array of objects
 * @returns  array of objects or array of arrays
 * @example
 * // returns array of arrays
 * extractMailJetResponseToArray(response,0)
 * // returns array of objects
 * extractMailJetResponseToArray(response,1)
 */
const extractMailJetResponseToArray = (response: any,return_type:number|null=0): MailJetResponse => {
  return response.body?.Messages?.map((message: any) => {
    let to = message.To ? message.To[0] : {};
    let obj = {
      CustomID: message.CustomID || null,
      // Email: to.Email || null,
      Status: message.Status=='success'?1:9, // 1 = success, 9 = error as per the database schema for the alerts table webapp.notifications_email_log
      MessageUUID: to.MessageUUID || null,
      MessageID: to.MessageID || null,
      MessageHref: to.MessageHref || null,
      ErrorIdentifier: message.Errors
      ? message.Errors[0].ErrorIdentifier
      : null,
      ErrorCode: message.Errors ? message.Errors[0].ErrorCode : null,
      ErrorMessage: message.Errors ? message.Errors[0].ErrorMessage : null,
      ErrorRelatedTo: message.Errors ? message.Errors[0].ErrorRelatedTo : null,
    }

    if(return_type === 1 ) return obj;
    if(return_type === 0 ) return Object.values(obj);
  });
};
export default extractMailJetResponseToArray;
