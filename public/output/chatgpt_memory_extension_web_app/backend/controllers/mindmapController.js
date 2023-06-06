
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Create a new mind map
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const createMindmap = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const result = await pool.query(
      'INSERT INTO mindmaps (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mind map' });
  }
};

/**
 * Get a mind map by ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getMindmap = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM mindmaps WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mind map' });
  }
};

/**
 * Update a mind map by ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const updateMindmap = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      'UPDATE mindmaps SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating mind map' });
  }
};

/**
 * Delete a mind map by ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const deleteMindmap = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM mindmaps WHERE id = $1', [id]);
    res.status(204).json({ message: 'Mind map deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mind map' });
  }
};

module.exports = {
  createMindmap,
  getMindmap,
  updateMindmap,
  deleteMindmap,
};
