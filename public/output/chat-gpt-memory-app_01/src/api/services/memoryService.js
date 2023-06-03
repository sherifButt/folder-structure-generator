/**
 * Memory Service
 * 
 * Manages memory storage, retrieval, and updates
 * 
 * Dependencies: promptRepository, featureRepository, taskRepository, memoryRepository
 * 
 * Functions:
 *  - createMemory
 *  - getMemory
 *  - updateMemory
 *  
 * Imports: promptRepository, featureRepository, taskRepository, memoryRepository
 * 
 * Exports: memoryService
 */

const promptRepository = require('../db/repositories/promptRepository');
const featureRepository = require('../db/repositories/featureRepository');
const taskRepository = require('../db/repositories/taskRepository');
const memoryRepository = require('../db/repositories/memoryRepository');

const memoryService = {
  /**
   * Creates a new memory
   * @param {Object} data - The memory data
   * @returns {Promise<Object>} - The created memory
   * @throws {Error} - If there was an error creating the memory
   */
  async createMemory(data) {
    try {
      const memory = await memoryRepository.create(data);
      return memory;
    } catch (error) {
      throw new Error(`Error creating memory: ${error.message}`);
    }
  },

  /**
   * Gets a memory by id
   * @param {string} id - The memory id
   * @returns {Promise<Object>} - The memory with the given id
   * @throws {Error} - If there was an error retrieving the memory
   */
  async getMemory(id) {
    try {
      const memory = await memoryRepository.findById(id);
      if (!memory) throw new Error(`Memory not found with id: ${id}`);
      return memory;
    } catch (error) {
      throw new Error(`Error retrieving memory: ${error.message}`);
    }
  },

  /**
   * Updates a memory by id
   * @param {string} id - The memory id
   * @param {Object} data - The memory data to update
   * @returns {Promise<Object>} - The updated memory
   * @throws {Error} - If there was an error updating the memory
   */
  async updateMemory(id, data) {
    try {
      const memory = await memoryRepository.update(id, data);
      return memory;
    } catch (error) {
      throw new Error(`Error updating memory: ${error.message}`);
    }
  },
};

module.exports = memoryService;
