
 /* This file contains the controllers for creating, reading, updating, and deleting tasks.
 * Implemented using JavaScript, Express, and PostgreSQL.
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
 * @returns {Object} - The newly created task
 */
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description, due_date, priority) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, dueDate, priority]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Get a task by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The task with the specified ID
 */
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [id]);
    if (task.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Update a task by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The updated task
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;
    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, priority = $4 WHERE task_id = $5 RETURNING *',
      [title, description, dueDate, priority, id]
    );
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Delete a task by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The deleted task
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await pool.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [id]);
    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(deletedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createTask, getTask, updateTask, deleteTask };
