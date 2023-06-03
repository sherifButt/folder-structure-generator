require('dotenv').config();

const gpt4Config = {
  apiKey: process.env.GPT4_API_KEY,
  apiUrl: process.env.GPT4_API_URL,
  timeout: parseInt(process.env.GPT4_API_TIMEOUT) || 10000,
  maxRetries: parseInt(process.env.GPT4_API_MAX_RETRIES) || 3,
  retryDelay: parseInt(process.env.GPT4_API_RETRY_DELAY) || 1000,
};

module.exports = gpt4Config;
