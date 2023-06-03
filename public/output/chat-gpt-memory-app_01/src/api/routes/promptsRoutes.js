const express = require('express');
const promptsController = require('../controllers/promptsController');

const promptsRoutes = express.Router();

// GET all prompts
promptsRoutes.get('/', promptsController.getAllPrompts);

// GET a single prompt by ID
promptsRoutes.get('/:id', promptsController.getSinglePrompt);

// POST a new prompt
promptsRoutes.post('/', promptsController.createPrompt);

// PUT update a prompt by ID
promptsRoutes.put('/:id', promptsController.updatePrompt);

// DELETE a prompt by ID
promptsRoutes.delete('/:id', promptsController.deletePrompt);

module.exports = promptsRoutes;
