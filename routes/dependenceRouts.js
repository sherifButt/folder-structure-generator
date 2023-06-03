const express = require('express');
const router = express.Router();
const { getAllDependencies, createDependence, getDependenceById, updateDependenceById, deleteDependenceById } = require('../controllers/dependenceController');

/**
 * @swagger
 * /api/dependencies:
 *  get:
 *    tags: [Dependencies]
 *    summary: Get all dependencies.
 *    description: Get all dependencies.
 *    responses:
 *      200:
 *        description: Success!
 *      500:
 *        description: Error!
 */
router.get('/', getAllDependencies);

/**
 * @swagger
 * /api/dependencies:
 *  post:
 *    tags: [Dependencies]
 *    summary: Create a new dependence.
 *    description: Create a new dependence, and return a token.  
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - slug
 *              - description
 *              - projects
 *            properties:
 *              name:
 *                type: string
 *              slug:
 *                type: string
 *              description:
 *                type: string
 *              projects:
 *               type: array
 *               items: 
 *                 type: string
 *    responses:
 *      201:
 *        description: Dependence created successfully!
 *      400:
 *        description: No dependence created!
 *      401:
 *        description: Unauthorized!
 *      500:
 *        description: Error!
 */

router.post('/', createDependence);

/**
 * @swagger
 * /api/dependencies/{id}:
 *  get:
 *    tags: [Dependencies]
 *    summary: Get a single dependence.
 *    description: Get a single dependence.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The dependence id.
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success!
 *      400:
 *        description: No dependence found!
 *      401:
 *        description: Unauthorized!
 *      500:
 *        description: Error!
 */

router.get('/:id', getDependenceById);

/**
 * @swagger
 * /api/dependencies/{id}:
 *  put:
 *    tags: [Dependencies]
 *    summary: Update a dependence by id.
 *    description: Update a dependence by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The dependence id.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - slug
 *              - description
 *              - projects
 *            properties:
 *              name:
 *                type: string
 *              slug:
 *                type: string
 *              description:
 *                type: string
 *              projects:
 *               type: array
 *               items: 
 *                 type: string
 *    responses:
 *      200:
 *        description: Dependence updated successfully!
 *      400:
 *        description: No dependence updated!
 *      401:
 *        description: Unauthorized!
 *      500:
 *        description: Error!
 */
router.put('/:id', updateDependenceById);

/**
 * @swagger
 * /api/dependencies/{id}:
 *   delete:
 *     tags: [Dependencies]
 *     summary: Delete a dependence by ID.
 *     description: Delete a dependence by its unique ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the dependence to delete.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Dependence deleted successfully!
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
 *         description: No dependence deleted!
 *       401:
 *         description: Unauthorized!
 *       500:
 *         description: Error!
 */
router.delete('/:id', deleteDependenceById);

module.exports = router; 