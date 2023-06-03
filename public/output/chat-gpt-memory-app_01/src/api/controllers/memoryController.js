const express = require('express');
const router = express.Router();
const { getMemory, updateMemory } = require('../services/memoryService');
const { searchMemory } = require('../services/searchService');

/**
 * @typedef {Object} Memory
 * @property {number} id - ID of the memory.
 * @property {string} title - Title of the memory.
 * @property {string} description - Description of the memory.
 * @property {string[]} tags - Tags associated with the memory.
 * @property {Date} createdAt - Date the memory was created.
 * @property {Date} updatedAt - Date the memory was last updated.
 */

/**
 * @route GET /memory/:id
 * @description Get a memory by ID
 * @param {number} id.path.required - ID of the memory
 * @returns {Memory} 200 - Memory object
 * @returns {Error}  404 - Memory not found
 * @returns {Error}  500 - Server error
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const memory = await getMemory(id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }
    res.json(memory);
  } catch (err) {
    next(err);
  }
});

/**
 * @route PUT /memory/:id
 * @description Update a memory by ID
 * @param {number} id.path.required - ID of the memory
 * @param {Memory.model} memory.body.required - Memory object
 * @returns {Memory} 200 - Memory object
 * @returns {Error}  404 - Memory not found
 * @returns {Error}  500 - Server error
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const memory = await updateMemory(id, title, description, tags);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }
    res.json(memory);
  } catch (err) {
    next(err);
  }
});

/**
 * @route GET /memory/search
 * @description Search memories by title or tags
 * @param {string} q.query.required - Search query string
 * @returns {Memory[]} 200 - Array of memory objects
 * @returns {Error}  500 - Server error
 */
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    const memories = await searchMemory(q);
    res.json(memories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
