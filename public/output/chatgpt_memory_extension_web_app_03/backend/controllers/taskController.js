/**
 * This file contains the controllers for creating, reading, updating, and deleting tasks.
 * Implemented using JavaScript, Express, and PostgreSQL.
 *
 * File name: taskController.js
 * Dependencies: Express, PostgreSQL
 * Functions: createTask, getTask, updateTask, deleteTask
 * Imports: Express, PostgreSQL
 * Exports: createTask, getTask, updateTask, deleteTask
 */

const express = require('express');
const router = express.Router();
const pool = require('../models/db');

/**
 * Create a new task
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createTask = async (req, res) => {
  const { title, description, mindmapId } = req.body;

  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description, mindmap_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, mindmapId]
    );
    res.json(newTask.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error: Could not create task' });
  }
};

/**
 * Get a task by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (task.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error: Could not get task' });
  }
};

/**
 * Update a task by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    if (updatedTask.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error: Could not update task' });
  }
};

/**
 * Delete a task by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (deletedTask.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(deletedTask.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error: Could not delete task' });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
