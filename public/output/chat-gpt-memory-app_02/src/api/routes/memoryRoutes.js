const express = require('express');
const memoryController = require('../controllers/memoryController');

const memoryRoutes = express.Router();

memoryRoutes.get('/memory/:id', memoryController.getMemoryById);
memoryRoutes.post('/memory', memoryController.createMemory);
memoryRoutes.put('/memory/:id', memoryController.updateMemoryById);
memoryRoutes.delete('/memory/:id', memoryController.deleteMemoryById);

module.exports = memoryRoutes;
