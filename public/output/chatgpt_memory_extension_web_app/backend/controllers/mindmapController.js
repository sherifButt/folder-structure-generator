
 /* @swagger
 * tags:
 *   name: Mindmaps
 *   description: Mindmap management
 */

const express = require('express');
const router = express.Router();
const pool = require('../models/db');

/**
 * @swagger
 * /mindmaps:
 *   post:
 *     summary: Create a new mindmap
 *     tags: [Mindmaps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               data:
 *                 type: object
 *             example:
 *               title: My Mindmap
 *               description: This is a mindmap about my project
 *               data: { "nodes": [], "links": [] }
 *     responses:
 *       200:
 *         description: Mindmap created successfully
 *       500:
 *         description: Internal server error
 */
const createMindmap = async (req, res) => {
  try {
    const { title, description, data } = req.body;
    const newMindmap = await pool.query(
      'INSERT INTO mindmaps (title, description, data) VALUES ($1, $2, $3) RETURNING *',
      [title, description, data]
    );
    res.json(newMindmap.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @swagger
 * /mindmaps/{id}:
 *   get:
 *     summary: Get a mindmap by ID
 *     tags: [Mindmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the mindmap to get
 *     responses:
 *       200:
 *         description: Mindmap retrieved successfully
 *       404:
 *         description: Mindmap not found
 *       500:
 *         description: Internal server error
 */
const getMindmap = async (req, res) => {
  try {
    const { id } = req.params;
    const mindmap = await pool.query('SELECT * FROM mindmaps WHERE id = $1', [id]);
    if (mindmap.rows.length === 0) {
      return res.status(404).json({ error: 'Mindmap not found' });
    }
    res.json(mindmap.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @swagger
 * /mindmaps/{id}:
 *   put:
 *     summary: Update a mindmap by ID
 *     tags: [Mindmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the mindmap to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               data:
 *                 type: object
 *             example:
 *               title: My Mindmap
 *               description: This is a mindmap about my project
 *               data: { "nodes": [], "links": [] }
 *     responses:
 *       200:
 *         description: Mindmap updated successfully
 *       404:
 *         description: Mindmap not found
 *       500:
 *         description: Internal server error
 */
const updateMindmap = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, data } = req.body;
    const updatedMindmap = await pool.query(
      'UPDATE mindmaps SET title = $1, description = $2, data = $3 WHERE id = $4 RETURNING *',
      [title, description, data, id]
    );
    if (updatedMindmap.rows.length === 0) {
      return res.status(404).json({ error: 'Mindmap not found' });
    }
    res.json(updatedMindmap.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @swagger
 * /mindmaps/{id}:
 *   delete:
 *     summary: Delete a mindmap by ID
 *     tags: [Mindmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the mindmap to delete
 *     responses:
 *       200:
 *         description: Mindmap deleted successfully
 *       404:
 *         description: Mindmap not found
 *       500:
 *         description: Internal server error
 */
const deleteMindmap = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMindmap = await pool.query('DELETE FROM mindmaps WHERE id = $1 RETURNING *', [id]);
    if (deletedMindmap.rows.length === 0) {
      return res.status(404).json({ error: 'Mindmap not found' });
    }
    res.json(deletedMindmap.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createMindmap,
  getMindmap,
  updateMindmap,
  deleteMindmap,
  router
};
