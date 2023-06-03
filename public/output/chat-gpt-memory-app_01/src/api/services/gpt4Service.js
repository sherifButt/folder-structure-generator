const axios = require('axios');
const config = require('config');

const gpt4Service = {
  /**
   * Process input and get response from Chat GPT-4 API
   * @param {string} input - User input to be processed
   * @returns {Promise<string>} - Response from Chat GPT-4 API
   */
  async processInput(input) {
    try {
      const response = await axios.post(config.get('gpt4Url'), { input });
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error('Error processing input with Chat GPT-4 API');
    }
  },
};

module.exports = gpt4Service;
