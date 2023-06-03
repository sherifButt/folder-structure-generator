/**
 * @module promptsController
 */

const express = require('express');
const gpt4Service = require('../services/gpt4Service');
const memoryService = require('../services/memoryService');
const promptProcessor = require('../utils/promptProcessor');

/**
 * Express router to mount prompt-related functions on.
 * @type {object}
 * @const
 * @namespace promptsController
 */
const promptsController = express.Router();

/**
 * Route serving all prompts.
 * @name getPrompts
 * @function
 * @memberof module:promptsController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
promptsController.get('/', async (req, res, next) => {
  try {
    const prompts = await memoryService.getAllPrompts();
    res.json(prompts);
  } catch (error) {
    next(error);
  }
});

/**
 * Route creating a new prompt.
 * @name createPrompt
 * @function
 * @memberof module:promptsController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
promptsController.post('/', async (req, res, next) => {
  try {
    const { promptText } = req.body;
    const prompt = await memoryService.addPrompt(promptText);
    res.json(prompt);
  } catch (error) {
    next(error);
  }
});

/**
 * Route updating an existing prompt.
 * @name updatePrompt
 * @function
 * @memberof module:promptsController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
promptsController.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { promptText } = req.body;
    const prompt = await memoryService.updatePrompt(id, promptText);
    const processedPrompt = promptProcessor.process(prompt.promptText);
    const response = await gpt4Service.generateResponse(processedPrompt);
    await memoryService.updateOrCreateFeature(processedPrompt, response);
    res.json(prompt);
  } catch (error) {
    next(error);
  }
});

module.exports = promptsController;
