


const express = require('express');
const { Pool } = require('pg');

// Create a new router instance
const taskRoutes = express.Router();

// Create a new PostgreSQL pool
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Define routes
taskRoutes.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

taskRoutes.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

taskRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

taskRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = taskRoutes;

