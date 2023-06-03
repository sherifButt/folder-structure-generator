/**
 * @swagger
 * tags:
 *   name: Prompts
 *   description: API for user prompts
 */

/**
 * @swagger
 * /prompts/:
 *   post:
 *     summary: Create new prompt
 *     tags: [Prompts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prompt'
 *     responses:
 *       200:
 *         description: Prompt created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /prompts/:
 *   get:
 *     summary: Get all prompts
 *     tags: [Prompts]
 *     responses:
 *       200:
 *         description: Returns all prompts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prompt'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /prompts/{promptId}:
 *   get:
 *     summary: Get prompt by ID
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: promptId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the prompt to get
 *     responses:
 *       200:
 *         description: Prompt found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       404:
 *         description: Prompt not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /prompts/{promptId}:
 *   put:
 *     summary: Update prompt by ID
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: promptId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the prompt to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prompt'
 *     responses:
 *       200:
 *         description: Prompt updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Prompt not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /prompts/{promptId}:
 *   delete:
 *     summary: Delete prompt by ID
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: promptId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the prompt to delete
 *     responses:
 *       200:
 *         description: Prompt deleted successfully
 *       404:
 *         description: Prompt not found
 *       500:
 *         description: Server error
 */

const express = require('express');
const promptsController = require('../controllers/promptsController');

const promptsRoutes = express.Router();

promptsRoutes.post('/', promptsController.createPrompt);
promptsRoutes.get('/', promptsController.getAllPrompts);
promptsRoutes.get('/:promptId', promptsController.getPromptById);
promptsRoutes.put('/:promptId', promptsController.updatePromptById);
promptsRoutes.delete('/:promptId', promptsController.deletePromptById);

module.exports = promptsRoutes;
