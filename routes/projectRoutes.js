const express = require('express');
const router = express.Router();
const { getAllProjects, createProject, getProjectById, updateProjectById, deleteProjectById } = require('../controllers/projectController');

/**
 * @swagger
 * /api/projects:
 *  get:
 *    tags: [📦 Projects]
 *    summary: Get all projects.
 *    description: Get all projects.
 *    responses:
 *      200:
 *        description: Success!
 *      500:
 *        description: Error!
 */
router.get('/', getAllProjects);

/**
 * @swagger
 * /api/projects:
 *  post:
 *    tags: [📦 Projects]
 *    summary: Create a new project.
 *    description: Create a new project.
 *    parameters:
 *      - in: body
 *        name: project
 *        description: The project to create.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *    responses:
 *      201:
 *        description: Project created successfully!
 *      400:
 *        description: No project created!
 *      500:
 *        description: Error!
 */
router.post('/', createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *  get:
 *    tags: [📦 Projects]
 *    summary: Get a single project.
 *    description: Get a single project.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The project id.
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success!
 *      400:
 *        description: No project found!
 *      500:
 *        description: Error!
 */
router.get('/:id', getProjectById);

/**
 * @swagger
 * /api/projects/{id}:
 *  patch:
 *    tags: [📦 Projects]
 *    summary: Update a project by id.
 *    description: Update a project by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The project id.
 *      - in: body
 *        name: project
 *        description: The project to update.
 *        schema:
 *          type: object
 *          required:
 *            - user_id
 *            - meta
 *            - messages
 *            - folderStructure
 *          properties:
 *            user_id:
 *              type: string
 *            meta:
 *              type: object
 *            messages:
 *              type: array
 *            folderStructure:
 *              type: object
 *    responses:
 *      200:
 *        description: Project updated successfully!
 *      400:
 *        description: No project updated!
 *      500:
 *        description: Error!
 */
router.put('/:id', updateProjectById);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags: [📦 Projects]
 *     summary: Delete a project by ID.
 *     description: Delete a project by its unique ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project to delete.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully!
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status code.
 *                   example: 200
 *       400:
 *         description: No project deleted!
 *       500:
 *         description: Error!
 */
router.delete('/:id', deleteProjectById);

module.exports = router;
