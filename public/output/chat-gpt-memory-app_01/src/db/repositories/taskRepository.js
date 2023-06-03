const Task = require('../db/models/task');

/**
 * @typedef {Object} Task
 * @property {number} id - The ID of the task.
 * @property {string} name - The name of the task.
 * @property {string} description - The description of the task.
 * @property {number} priority - The priority of the task.
 * @property {boolean} completed - Whether the task is completed or not.
 */

/**
 * Gets all tasks from the database.
 * @returns {Promise<Task[]>} Promise object representing an array of tasks.
 */
async function getTasks() {
  return await Task.findAll();
}

/**
 * Creates a new task in the database.
 * @param {Task} task - The task to be created.
 * @returns {Promise<Task>} Promise object representing the created task.
 */
async function createTask(task) {
  return await Task.create(task);
}

/**
 * Updates an existing task in the database.
 * @param {number} id - The ID of the task to be updated.
 * @param {Task} taskData - The new data to update the task with.
 * @returns {Promise<Task>} Promise object representing the updated task.
 */
async function updateTask(id, taskData) {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new Error(`Task with ID ${id} not found.`);
  }
  return await task.update(taskData);
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
};
