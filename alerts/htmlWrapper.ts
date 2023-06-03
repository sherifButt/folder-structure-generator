/**
 * create a html wrapper for an alert to be sent via email, or to be displayed on the client's browser
 * @function
 * @param messages message body
 * @param title message title
 * @returns  html string
 * @example
 * // returns html string
 * htmlWrapper(['message1','message2'],'title')
 * 
 */
const htmlWrapper = ( messages: string[]|string,title: string|null=null) =>{
if(typeof messages === 'string') messages = [messages];

  return `<html>
    <body>
        <h2>${title||''}</h2>
        ${messages.map((message:string)=>`<p>${message}</p>`).join('')}
    </body>
  </html>`};

export default htmlWrapper;
