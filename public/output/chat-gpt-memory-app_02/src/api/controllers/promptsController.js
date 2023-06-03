const express = require('express');
const gpt4Service = require('../services/gpt4Service');
const memoryService = require('../services/memoryService');
const promptProcessor = require('../utils/promptProcessor');

const promptsController = express.Router();

promptsController.get('/', async (req, res) => {
  try {
    const prompts = await memoryService.getAllPrompts();
    res.status(200).json(prompts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting prompts' });
  }
});

promptsController.post('/', async (req, res) => {
  try {
    const { promptText } = req.body;
    const prompt = await memoryService.createPrompt(promptText);
    res.status(201).json(prompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating prompt' });
  }
});

promptsController.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { promptText } = req.body;
    const prompt = await memoryService.updatePrompt(id, promptText);
    res.status(200).json(prompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating prompt' });
  }
});

promptsController.post('/response', async (req, res) => {
  try {
    const { promptText } = req.body;
    const prompt = await memoryService.createPrompt(promptText);
    const processedPrompt = promptProcessor.processPrompt(promptText);
    const response = await gpt4Service.generateResponse(processedPrompt);
    await memoryService.updateMemory(processedPrompt, response);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating response' });
  }
});

module.exports = promptsController;
