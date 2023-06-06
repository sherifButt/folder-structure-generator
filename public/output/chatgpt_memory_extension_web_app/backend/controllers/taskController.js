
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createTask = async (req, res) => {
  try {
    const { title, description, mindmap_id } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description, mindmap_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, mindmap_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, mindmap_id } = req.body;
    const { rows } = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, mindmap_id = $3 WHERE id = $4 RETURNING *',
      [title, description, mindmap_id, id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
