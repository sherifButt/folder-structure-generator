// Sure, here's an implementation of taskRoutes.js:


 * @swagger
 * tags:
 *  name: Task
 *  description: API for tasks
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Task:
 *          type: object
 *          required:
 *              - id
 *              - title
 *              - completed
 *          properties:
 *              id:
 *                  type: integer
 *                  description: ID of the task
 *              title:
 *                  type: string
 *                  description: Title of the task
 *              completed:
 *                  type: boolean
 *                  description: Whether the task is completed or not
 */

const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chatgpt_memory_extension',
    password: 'password',
    port: 5432,
});

const taskRoutes = express.Router();

/**
 * @swagger
 * /api/tasks:
 *  get:
 *      summary: Returns a list of tasks
 *      tags: [Task]
 *      responses:
 *          200:
 *              description: A list of tasks
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Task'
 */
taskRoutes.get('/api/tasks', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @swagger
 * /api/tasks:
 *  post:
 *      summary: Creates a new task
 *      tags: [Task]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - title
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: Title of the task
 *                          completed:
 *                              type: boolean
 *                              description: Whether the task is completed or not
 *      responses:
 *          200:
 *              description: The created task
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskRoutes.post('/api/tasks', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const { rows } = await pool.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
            [title, completed]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *  put:
 *      summary: Updates a task by ID
 *      tags: [Task]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the task to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: Title of the task
 *                          completed:
 *                              type: boolean
 *                              description: Whether the task is completed or not
 *      responses:
 *          200:
 *              description: The updated task
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskRoutes.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const { rows } = await pool.query(
            'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
            [title, completed, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *  delete:
 *      summary: Deletes a task by ID
 *      tags: [Task]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the task to delete
 *      responses:
 *          200:
 *              description: The deleted task
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskRoutes.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = taskRoutes;
