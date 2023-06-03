
/**
 * @swagger
 * tags:
 *  name: Mind Maps
 *  description: API for Mind Maps
 * definitions:
 *  MindMap:
 *    type: object
 *    required:
 *      - title
 *      - description
 *    properties:
 *      id:
 *        type: integer
 *        description: Unique identifier for the Mind Map
 *      title:
 *        type: string
 *        description: Title of the Mind Map
 *      description:
 *        type: string
 *        description: Description of the Mind Map
 *      data:
 *        type: object
 *        description: Data of the Mind Map
 *      createdAt:
 *        type: string
 *        format: date-time
 *        description: Date and time when the Mind Map was created
 *      updatedAt:
 *        type: string
 *        format: date-time
 *        description: Date and time when the Mind Map was updated
 */

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_pg_username',
  host: 'localhost',
  database: 'your_pg_database_name',
  password: 'your_pg_password',
  port: 5432,
});

/**
 * @swagger
 * /mindmaps:
 *  post:
 *    summary: Create a new Mind Map
 *    tags: [Mind Maps]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/MindMap'
 *    responses:
 *      "200":
 *        description: A Mind Map schema
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MindMap'
 *      "400":
 *        description: Invalid request body
 */
const createMindmap = async (req, res) => {
  const { title, description, data } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO mindmaps (title, description, data) VALUES ($1, $2, $3) RETURNING *',
      [title, description, data]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error creating Mind Map');
  }
};

/**
 * @swagger
 * /mindmaps/{id}:
 *  get:
 *    summary: Retrieve a Mind Map by ID
 *    tags: [Mind Maps]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the Mind Map
 *    responses:
 *      "200":
 *        description: A Mind Map schema
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MindMap'
 *      "404":
 *        description: Mind Map not found
 */
const getMindmap = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('SELECT * FROM mindmaps WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Mind Map not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Error retrieving Mind Map');
  }
};

/**
 * @swagger
 * /mindmaps/{id}:
 *  put:
 *    summary: Update a Mind Map by ID
 *    tags: [Mind Maps]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the Mind Map
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/MindMap'
 *    responses:
 *      "200":
 *        description: A Mind Map schema
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MindMap'
 *      "404":
 *        description: Mind Map not found
 */
const updateMindmap = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, data } = req.body;

  try {
    const result = await pool.query(
      'UPDATE mindmaps SET title = $1, description = $2, data = $3, updatedAt = NOW() WHERE id = $4 RETURNING *',
      [title, description, data, id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Mind Map not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating Mind Map');
  }
};

/**
 * @swagger
 * /mindmaps/{id}:
 *  delete:
 *    summary: Delete a Mind Map by ID
 *    tags: [Mind Maps]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the Mind Map
 *    responses:
 *      "204":
 *        description: Mind Map deleted
 *      "404":
 *        description: Mind Map not found
 */
const deleteMindmap = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('DELETE FROM mindmaps WHERE id = $1', [id]);

    if (result.rowCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Mind Map not found');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Error deleting Mind Map');
  }
};

module.exports = {
  createMindmap,
  getMindmap,
  updateMindmap,
  deleteMindmap,
  router,
};
