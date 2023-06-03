const memoryRepository = require('../db/repositories/memoryRepository');

/**
 * Handles context-aware memory search and retrieval.
 */
const searchService = {
  /**
   * Searches for memories based on the provided query and context.
   * @param {string} query - The search query.
   * @param {string} context - The context in which to search for memories.
   * @returns {Promise<Array>} - The list of matching memories.
   */
  async searchMemory(query, context) {
    try {
      const memories = await memoryRepository.getAll();
      const matchingMemories = memories.filter((memory) => {
        return memory.context === context && memory.text.includes(query);
      });
      return matchingMemories;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = searchService;
