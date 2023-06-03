// Import necessary modules
import axios from 'axios';

// Define API endpoint
const API_URL = 'http://localhost:3000/api';

// Get the prompts from the backend
async function getPrompts() {
  try {
    const response = await axios.get(`${API_URL}/prompts`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Send user input to the backend for processing
async function processInput(input) {
  try {
    const response = await axios.post(`${API_URL}/process`, { input });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Update the memory with new information
async function updateMemory(memory) {
  try {
    const response = await axios.put(`${API_URL}/memory`, { memory });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Export the functions for use in other modules
export { getPrompts, processInput, updateMemory };
