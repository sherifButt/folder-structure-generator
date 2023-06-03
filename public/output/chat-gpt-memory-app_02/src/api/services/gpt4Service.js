const axios = require('axios');
const config = require('config');

const gpt4Service = {
  /**
   * Processes user input using Chat GPT-4 API.
   * @param {string} input - User input to be processed.
   * @returns {Promise<string>} - Result of processing user input.
   */
  async processInput(input) {
    try {
      const response = await axios.post(config.get('gpt4Endpoint'), {
        prompt: input,
        length: config.get('gpt4Length'),
        temperature: config.get('gpt4Temperature'),
        top_p: config.get('gpt4TopP'),
        frequency_penalty: config.get('gpt4FrequencyPenalty'),
        presence_penalty: config.get('gpt4PresencePenalty'),
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.get('gpt4ApiToken')}`,
        },
      });
      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to process input using GPT-4 API');
    }
  },
};

module.exports = gpt4Service;
