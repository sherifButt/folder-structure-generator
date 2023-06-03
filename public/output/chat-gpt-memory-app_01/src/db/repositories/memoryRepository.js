/**
 * @typedef {import("../db/models/memory").MemoryModel} Memory
 */

const db = require("../config/database");
const Memory = require("../db/models/memory");

/**
 * @typedef {Object} MemoryRepository
 * @property {function(): Promise<Memory[]>} getMemory - Get all memories from the database
 * @property {function(memory:Memory): Promise<Memory>} createMemory - Create a new memory in the database
 * @property {function(id: string, memory: Memory): Promise<Memory>} updateMemory - Update a memory in the database
 * @property {function(query: string): Promise<Memory[]>} searchMemory - Search for memories in the database
 */

/** @type {MemoryRepository} */
const memoryRepository = {
  async getMemory() {
    const memories = await db.manyOrNone("SELECT * FROM memory");
    return memories.map((memory) => new Memory(memory));
  },

  async createMemory(memory) {
    const { title, description } = memory;
    const newMemory = await db.one(
      "INSERT INTO memory (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return new Memory(newMemory);
  },

  async updateMemory(id, memory) {
    const { title, description } = memory;
    const updatedMemory = await db.one(
      "UPDATE memory SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    return new Memory(updatedMemory);
  },

  async searchMemory(query) {
    const memories = await db.manyOrNone(
      "SELECT * FROM memory WHERE title ILIKE $1 OR description ILIKE $1",
      [`%${query}%`]
    );
    return memories.map((memory) => new Memory(memory));
  },
};

module.exports = memoryRepository;
