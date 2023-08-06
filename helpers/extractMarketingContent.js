const getGpt = require("./getGpt");

/**
 * Extracts marketing content from the given code using GPT-3.
 *
 * @async
 * @function
 * @param {string} code - The source code from which to extract marketing content.
 * @param {string} [targetDescription] - The target information to be used in the prompt.
 * @returns {Promise<string[]>} An array of strings containing the extracted marketing content.
 * @throws {Error} Throws an error if the GPT-3 API request fails.
 * @example
 * const code = `...`; // Your code here
 * extractMarketingContent(code).then((marketingContentArray) => {
 *   console.log(marketingContentArray);
 * });
 */
async function extractMarketingContent(code, targetDescription = "software development agency specialized in creating web applications. based in Cardiff, UK.") {
    // Define the prompt that describes the task
    const prompt = [
        {
            role: "system",
            content: "You are a helpful assistant that extracts marketing content from code.",
        },
        {
            role: "user",
            content: `Please extract marketing content form this code, and replacing its content with a content for a ${targetDescription}. then return the answer in an array like this:
            [{original:"original marketing content1",new:"new marketing content1"},...]: ${code}`,
        },
    ];

    // Call the getGpt function to send the prompt to GPT-3
    const response = await getGpt(prompt);

    // Extract the marketing content from the response
    const marketingContent = response.response;

    // You may need to further process the marketingContent to fit your desired format
    // ...

    return marketingContent;
}

module.exports = extractMarketingContent;
