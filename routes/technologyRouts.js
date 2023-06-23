const express = require('express');
const router = express.Router();
const { getAllTechnologies, createTechnology, getTechnologyById, updateTechnologyById, deleteTechnologyById } = require('../controllers/technologyController');

/**
 * @swagger
 * /api/technologies:
 *  get:
 *    tags: [📱 Technologies]
 *    summary: Get all technologies.
 *    description: Get all technologies.
 *    responses:
 *      200:
 *        description: Success!
 *      401:
 *        description: Unauthorized!
 *      403:
 *        description: Forbidden!
 *      500:
 *        description: Error!
 */
router.get('/', getAllTechnologies);

/**
 * @swagger
 * /api/technologies:
 *  post:
 *    tags: [📱 Technologies]
 *    summary: Create a new technology.
 *    description: Create a new technology, and return a token.  
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - slug
 *              - type
 *              - description
 *              - Projects
 *            properties:
 *              name:
 *                type: string
 *                example: MERN + AWS
 *              slug:
 *                type: string
 *                example: mern-aws
 *              type:
 *               type: string
 *               example: Development Stack
 *              description:
 *                type: string
 *                example: The development stack used in the project
 *              projects:
 *               type: array
 *               items: 
 *                 type: string
 *                 example: 5f7f1b7a7e5f9a2b1c7d1b1a
 *    responses:
 *      200:
 *        description: Technology created successfully!
 *      400:
 *        description: No technology created!
 *      401:
 *        description: Unauthorized!
 *      403:
 *        description: Forbidden!
 *      404:
 *        description: Not found!
 *      500:
 *        description: Error!
 */

router.post('/', createTechnology);

/**
 * @swagger
 * /api/technologies/{id}:
 *  get:
 *    tags: [📱 Technologies]
 *    summary: Get a single technology.
 *    description: Get a single technology.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The technology id.
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success!
 *      400:
 *        description: No technology found!
 *      401:
 *        description: Unauthorized!
 *      403:
 *        description: Forbidden!
 *      500:
 *        description: Error!
 */

router.get('/:id', getTechnologyById);

/**
 * @swagger
 * /api/technologies/{id}:
 *  put:
 *    tags: [📱 Technologies]
 *    summary: Update a technology by id.
 *    description: Update a technology by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The technology id.
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
 *              - Projects
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
 *        description: Technology updated successfully!
 *      400:
 *        description: No technology updated!
 *      401:
 *        description: Unauthorized!
 *      403:
 *        description: Forbidden!
 *      500:
 *        description: Error!
 */
router.put('/:id', updateTechnologyById);

/**
 * @swagger
 * /api/technologies/{id}:
 *   delete:
 *     tags: [📱 Technologies]
 *     summary: Delete a technology by ID.
 *     description: Delete a technology by its unique ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the technology to delete.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Technology deleted successfully!
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
 *         description: No technology deleted!
 *       401:
 *        description: Unauthorized!
 *       500:
 *         description: Error!
 */
router.delete('/:id', deleteTechnologyById);

module.exports = router; 