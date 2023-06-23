require('dotenv').config();
const cleanCode = require('./cleanResponse');
const getGpt = require('./getGpt');
const { isResponseComplete, isCodeBlock } = require('../utils/isResponseComplete');

/**
 * Retrieves generated code from the OpenAI ChatGPT API based on the provided prompt.
 * @async
 * @function
 * @category Helpers
 * @version 1.2.3
 * @tutorial    {@tutorial howtous} esolver is on e of the new features that will be added to the chatGPT API,
 *  it will be used to solve the problem of incomplete code snippets.
 *         solver will be used to solve the problem of incomplete code snippets.
 * @param {Array<Object>} prompt - The array of message objects to be sent as the prompt
 *  for the ChatGPT API.
 * @returns {Promise<Object>} An object containing the following properties:
 *  - cleanCode: The generated code without Markdown.
 *  - code: The generated code including Markdown (if requested).
 *  - usage: An object containing prompt_tokens, completion_tokens, and total_tokens,
 *  representing the API usage information.
 * @throws {Error} If an error occurs while connecting to the ChatGPT API or processing
 *  the response.
 */

async function getGeneratedCode(prompt) {

    const initailResponse = {
        cleanCode: "",
        code: "",
        usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0
        }
    }

    // return initailResponse if prompt is empty
    if (!prompt) {
        return initailResponse;
    }

    // Send the prompt to the ChatGPT API and return the generated code.

    try {

        // console.log('\x1b[32m%s\x1b[0m', `#[${interval}/${process.env.GPT_COOLDOWN_MAX_TRIES}] - Sending prompt to GPT API...`)
        // console.error('\x1b[32m%s\x1b[0m', 'Prompt:', prompt)
        
        const { response: code, usage } = await getGpt(prompt)

        // check if response is incomplete and ask chatGPT to complete it
        /*
        if (isCodeBlock(code)) {
            console.log('Response is incomplete, sending another request.');

            // prompt keep the first message and the last message and delete what is in between respond with the missing code
            prompt = [...prompt.slice(0, 1), prompt[prompt.length - 1]];
            prompt = [...prompt, { role: 'system', content: 'The last code snippet was incomplete. Can you complete it? Note: only respond the missing code snippet to complete the code.' }, { role: 'user', content: content }];
            initailResponse.response += content;
            incompleteTry++;  
            continue;  
        }
        */

        if (code) { 
            const { codeBlocks, cleanedResponse, noMarkdown,noGpt } = cleanCode(code);

            // return cleanedResponse;
            //  if (prompt[prompt.length - 1].content.includes('README.md')) return code;
            //  if (/README.md/g.test(prompt[prompt.length - 1].content)) return code;
            
            console.log('\x1b[32m%s\x1b[0m', 'usage:', usage)
            return {
                cleanCode: noMarkdown,
                code:noGpt,
                usage
            };

        } else {
            return initailResponse
        }
    }

    catch (error) {
        console.error(`Error connecting to ChatGPT API: ${error.message}`);
        // console.error('Error details:', error);

        if (error.response) {
            if (error.response.status === 401) {
                throw new Error('Error generating code: Invalid API key.');
            } else {
                throw new Error(`Error generating code: ${error.response.status} ${error.response.statusText}`);
            }
        } else if (error.request) {
            throw new Error('Error generating code: No response received from the server.');
        } else {
            throw new Error(`Error generating code: ${error.message}`);
        }
    }
}

module.exports = getGeneratedCode;
