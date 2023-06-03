// Sure, here's an implementation of taskController.js:

/**
 * This file contains the controllers for creating, reading, updating, and deleting tasks.
 * Implemented using JavaScript, Express, and PostgreSQL.
 */

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Create a new PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, mindmap_id } = req.body;
    const client = await pool.connect();
    const result = await client.query('INSERT INTO tasks (title, description, mindmap_id) VALUES ($1, $2, $3) RETURNING *', [title, description, mindmap_id]);
    const task = result.rows[0];
    client.release();
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Get a task by ID
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
    const task = result.rows[0];
    client.release();
    if (task) {
      res.status(200).json({ success: true, task });
    } else {
      res.status(404).json({ success: false, message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const client = await pool.connect();
    const result = await client.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
    const task = result.rows[0];
    client.release();
    if (task) {
      res.status(200).json({ success: true, task });
    } else {
      res.status(404).json({ success: false, message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    await client.query('DELETE FROM tasks WHERE id = $1', [id]);
    client.release();
    res.status(204).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask
};