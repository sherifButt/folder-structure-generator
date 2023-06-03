const express = require('express');
const memoryService = require('../services/memoryService');
const searchService = require('../services/searchService');

const memoryController = express.Router();

/**
 * @function getMemory
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - Memory object retrieved from the database
 * @description Retrieves memory object from the database based on the provided ID
 */
const getMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const memory = await memoryService.getMemoryById(id);
    res.json(memory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving memory' });
  }
};

/**
 * @function updateMemory
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - Updated memory object
 * @description Updates the memory object in the database based on the provided ID and request body
 */
const updateMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const { update } = req.body;
    const updatedMemory = await memoryService.updateMemoryById(id, update);
    res.json(updatedMemory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating memory' });
  }
};

/**
 * @function searchMemory
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {array} - Array of memory objects that match the search query
 * @description Searches for memory objects in the database that match the provided query
 */
const searchMemory = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await searchService.searchMemory(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching memory' });
  }
};

memoryController.get('/:id', getMemory);
memoryController.put('/:id', updateMemory);
memoryController.get('/search', searchMemory);

module.exports = memoryController;
