const express = require('express');
const gpt4Service = require('../services/gpt4Service');
const memoryService = require('../services/memoryService');
const promptProcessor = require('../utils/promptProcessor');

const promptsController = express.Router();

promptsController.get('/', async (req, res, next) => {
  try {
    const prompts = await memoryService.getAllPrompts();
    res.status(200).json(prompts);
  } catch (error) {
    next(error);
  }
});

promptsController.post('/', async (req, res, next) => {
  try {
    const { promptText } = req.body;
    const prompt = await memoryService.createPrompt(promptText);
    res.status(201).json(prompt);
  } catch (error) {
    next(error);
  }
});

promptsController.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { promptText } = req.body;
    const prompt = await memoryService.updatePrompt(id, promptText);
    res.status(200).json(prompt);
  } catch (error) {
    next(error);
  }
});

promptsController.post('/process', async (req, res, next) => {
  try {
    const { promptText } = req.body;
    const processedPrompt = promptProcessor.processPrompt(promptText);
    const response = await gpt4Service.generateResponse(processedPrompt);
    await memoryService.updateMemory(processedPrompt, response);
    res.status(200).json({ prompt: processedPrompt, response });
  } catch (error) {
    next(error);
  }
});

module.exports = promptsController;
