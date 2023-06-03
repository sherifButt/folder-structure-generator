


const express = require('express');
const { Pool } = require('pg');

// Create a new router instance
const mindmapRoutes = express.Router();

// Create a new PostgreSQL pool
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Define routes
mindmapRoutes.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM mindmaps');
    const mindmaps = result.rows;
    client.release();
    res.status(200).json(mindmaps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

mindmapRoutes.post('/', async (req, res) => {
  const { title, description, data } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO mindmaps (title, description, data) VALUES ($1, $2, $3) RETURNING *',
      [title, description, data]
    );
    const mindmap = result.rows[0];
    client.release();
    res.status(201).json(mindmap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

mindmapRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM mindmaps WHERE id = $1', [id]);
    const mindmap = result.rows[0];
    client.release();
    if (mindmap) {
      res.status(200).json(mindmap);
    } else {
      res.status(404).json({ message: 'Mind map not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

mindmapRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, data } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE mindmaps SET title = $1, description = $2, data = $3 WHERE id = $4 RETURNING *',
      [title, description, data, id]
    );
    const mindmap = result.rows[0];
    client.release();
    if (mindmap) {
      res.status(200).json(mindmap);
    } else {
      res.status(404).json({ message: 'Mind map not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

mindmapRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM mindmaps WHERE id = $1 RETURNING *', [id]);
    const mindmap = result.rows[0];
    client.release();
    if (mindmap) {
      res.status(200).json(mindmap);
    } else {
      res.status(404).json({ message: 'Mind map not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = mindmapRoutes;

