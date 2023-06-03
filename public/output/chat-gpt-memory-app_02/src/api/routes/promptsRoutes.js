const express = require('express');
const promptsController = require('../controllers/promptsController');

const promptsRoutes = express.Router();

promptsRoutes.post('/prompts/:userId', promptsController.createPrompt);
promptsRoutes.get('/prompts/:userId', promptsController.getPromptsByUser);
promptsRoutes.get('/prompts/:id', promptsController.getPromptById);
promptsRoutes.put('/prompts/:id', promptsController.updatePrompt);

module.exports = promptsRoutes;
