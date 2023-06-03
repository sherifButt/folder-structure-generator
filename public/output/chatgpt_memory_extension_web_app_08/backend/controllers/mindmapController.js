
/*
 * @swagger
 * components:
 *   schemas:
 *     Mindmap:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         data:
 *           type: json
 */

const express = require('express');
const { Pool } = require('pg');
const pool = new Pool();
const router = express.Router();

/**
 * @swagger
 * /mindmaps:
 *   post:
 *     summary: Create a new mind map
 *     tags: [Mindmaps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mindmap'
 *     responses:
 *       200:
 *         description: The mind map was created successfully
 *       500:
 *         description: An error occurred while creating the mind map
 */
async function createMindmap(req, res) {
  const { title, description, data } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO mindmaps (title, description, data) VALUES ($1, $2, $3) RETURNING id',
      [title, description, data]
    );
    res.status(200).json({ id: result.rows[0].id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while creating the mind map' });
  } finally {
    client.release();
  }
}

/**
 * @swagger
 * /mindmaps/{id}:
 *   get:
 *     summary: Get a mind map by ID
 *     tags: [Mindmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mind map to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The mind map was retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mindmap'
 *       404:
 *         description: The specified mind map was not found
 *       500:
 *         description: An error occurred while retrieving the mind map
 */
async function getMindmap(req, res) {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM mindmaps WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Mind map not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while retrieving the mind map' });
  } finally {
    client.release();
  }
}

/**
 * @swagger
 * /mindmaps/{id}:
 *   put:
 *     summary: Update a mind map by ID
 *     tags: [Mindmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mind map to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mindmap'
 *     responses:
 *       200:
 *         description: The mind map was updated successfully
 *       404:
 *         description: The specified mind map was not found
 *       500:
 *         description: An error occurred while updating the mind map
 */
async function updateMindmap(req, res) {
  const { id } = req.params;
  const { title, description, data } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE mindmaps SET title = $1, description = $2, data = $3 WHERE id = $4 RETURNING id',
      [title, description, data, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Mind map updated successfully' });
    } else {
      res.status(404).json({ error: 'Mind map not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while updating the mind map' });
  } finally {
    client.release();
  }
}

/**
 * @swagger
 * /mindmaps/{id}:
 *   delete:
 *     summary: Delete a mind map by ID
 *     tags: [Mindmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mind map to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The mind map was deleted successfully
 *       404:
 *         description: The specified mind map was not found
 *       500:
 *         description: An error occurred while deleting the mind map
 */
async function deleteMindmap(req, res) {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM mindmaps WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Mind map deleted successfully' });
    } else {
      res.status(404).json({ error: 'Mind map not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while deleting the mind map' });
  } finally {
    client.release();
  }
}

router.post('/', createMindmap);
router.get('/:id', getMindmap);
router.put('/:id', updateMindmap);
router.delete('/:id', deleteMindmap);

module.exports = router;
