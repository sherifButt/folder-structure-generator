const express = require('express');
const memoryService = require('../services/memoryService');
const searchService = require('../services/searchService');

const memoryController = express.Router();

/**
 * @swagger
 * /memory/{memoryId}:
 *   get:
 *     summary: Get a memory by ID
 *     parameters:
 *       - in: path
 *         name: memoryId
 *         required: true
 *         description: ID of the memory to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Memory found and returned
 *         schema:
 *           $ref: '#/definitions/Memory'
 *       404:
 *         description: Memory not found
 */
memoryController.get('/:memoryId', async (req, res, next) => {
  try {
    const memory = await memoryService.getMemoryById(req.params.memoryId);
    if (!memory) {
      res.status(404).send('Memory not found');
      return;
    }
    res.json(memory);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /memory/{memoryId}:
 *   put:
 *     summary: Update a memory by ID
 *     parameters:
 *       - in: path
 *         name: memoryId
 *         required: true
 *         description: ID of the memory to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: memory
 *         required: true
 *         description: Memory object to update
 *         schema:
 *           $ref: '#/definitions/Memory'
 *     responses:
 *       200:
 *         description: Memory updated successfully
 *         schema:
 *           $ref: '#/definitions/Memory'
 *       404:
 *         description: Memory not found
 */
memoryController.put('/:memoryId', async (req, res, next) => {
  try {
    const updatedMemory = await memoryService.updateMemory(req.params.memoryId, req.body);
    if (!updatedMemory) {
      res.status(404).send('Memory not found');
      return;
    }
    res.json(updatedMemory);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /memory/search:
 *   get:
 *     summary: Search memories by text
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Text to search for in memories
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Memories found and returned
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Memory'
 *       404:
 *         description: No memories found
 */
memoryController.get('/search', async (req, res, next) => {
  try {
    const query = req.query.query;
    const results = await searchService.searchMemories(query);
    if (results.length === 0) {
      res.status(404).send('No memories found');
      return;
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = memoryController;
```

Note: The above code assumes that the Swagger documentation has already been generated for the API. If not, it should be generated using the appropriate tools.