const express = require('express');
const memoryController = require('../controllers/memoryController');

const memoryRoutes = express.Router();

memoryRoutes.post('/memories', memoryController.createMemory);
memoryRoutes.get('/memories', memoryController.getAllMemories);
memoryRoutes.get('/memories/:id', memoryController.getMemoryById);
memoryRoutes.put('/memories/:id', memoryController.updateMemoryById);
memoryRoutes.delete('/memories/:id', memoryController.deleteMemoryById);

module.exports = memoryRoutes;
