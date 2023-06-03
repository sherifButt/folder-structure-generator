 require( 'dotenv').config(); 
 const { Configuration, OpenAIApi }=require("openai")
const   cooldown =require('../utils/cooldown'); // Wait for a random time between min and max seconds

/**
 * @file This file defines the function that retrieves generated code from the OpenAI ChatGPT API based on the provided prompt.
 * @see {@link https://beta.openai.com/docs/api-reference/create-completion|OpenAI API Reference: Create Completion}
 * @author Sherif Butt
 * 
 */
/**
 * Retrieves response from the OpenAI ChatGPT API based on the provided prompt.
 * @async
 * @function
 * @param {Array<Object>} prompt - The array of message objects to be sent as the prompt for the ChatGPT API.
 * @returns {Promise<GptResponse>} 
 *  - response: The generated response.
 *  - usage: An object containing :
 *      - prompt_tokens: representing the number of tokens used for the prompt.
 *      - ompletion_tokens: representing the number of tokens used for the completion.
 *      - total_token: representing the API usage information.
 * @throws {Error} If an error occurs while connecting to the ChatGPT API or processing the response.
 */

async function getGpt(prompt) {

    const initailResponse = {
        response: "",
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

    const configuration = new Configuration({ 
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    for (let interval = 0; interval < Number(String(process.env.GPT_COOLDOWN_MAX_TRIES)); interval++) {
        try {
            console.error('\x1b[32m%s\x1b[0m', 'Prompt:', prompt)

            await cooldown(interval);

            const apiResponse = await openai.createChatCompletion({
                model: process.env.GPT_MODEL_ID,
                messages: prompt,
                temperature: Number(String(process.env.GPT_TEMPERATURE)),
                n: 1,
                // stop: '/n',
            });

            if (apiResponse.status === 200) {
                if (apiResponse.data.choices && apiResponse.data.choices.length > 0) {
                    const content = apiResponse.data.choices[0].message.content.trim();
                    console.log('\x1b[31m%s\x1b[0m', 'Response:', content)

                    initailResponse.response += content;
                    initailResponse.usage = apiResponse.data.usage;
                    return initailResponse;
                } else {
                    return initailResponse;
                }
            } else if (apiResponse.status === 429 && process.env.GPT_PREVENT_TOO_MANY_REQUESTS === 'true' && interval < process.env.GPT_COOLDOWN_MAX_TRIES - 1) {
                console.log('\x1b[31m%s\x1b[0m', `#[${interval}/${process.env.GPT_COOLDOWN_MAX_TRIES}] - Too many requests to GPT API. Waiting for 5 seconds and trying again...`)
                await cooldown();
                console.log('\x1b[31m%s\x1b[0m', `Traying again to get a apiResponse...`)

            } else {
                throw new Error(`API request failed: ${apiResponse.status} ${apiResponse.statusText}`);
            }

        } catch (error) {
            console.error(`Error connecting to ChatGPT API: ${error.message}`);
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
}
module.exports = getGpt;

/**
 * @typedef {Object} Usage
 * @property {number} prompt_tokens - The number of tokens used for the prompt.
 * @property {number} completion_tokens - The number of tokens used for the completion.
 * @property {number} total_tokens - The total number of tokens used.
 */

/**
 * @typedef {Object} GptResponse
 * @property {string} response - The generated response.
 * @property {Usage} usage - An object containing prompt_tokens, completion_tokens, and total_tokens, representing the API usage information.
 */