const express = require('express');
const router = express.Router();
const { getAllTypes, createType, getTypeById, updateTypeById, deleteTypeById } = require('../controllers/typeController');

/**
 * @swagger
 * /api/types:
 *  get:
 *    tags: [🎫 Types]
 *    summary: Get all types.
 *    description: Get all types.
 *    responses:
 *      200:
 *        description: Success!
 *      500:
 *        description: Error!
 */
router.get('/', getAllTypes);

/**
 * @swagger
 * /api/types:
 *  post:
 *    tags: [🎫 Types]
 *    summary: Create a new type.
 *    description: Create a new type.
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - slug
 *          properties:
 *            name:
 *              type: string
 *              example: Development Stack
 *            slug:
 *              type: string
 *              example: development-stack
 *            description:
 *              type: string
 *              example: The development stack used in the project
 *            technologies:
 *              type: array
 *              items:
 *               type: string
 *               example: 5f7f1b7a7e5f9a2b1c7d1b1a
 *    responses:
 *      201:
 *        description: type created successfully!
 *      400:
 *        description: No type created!
 *      500:
 *        description: Error!
 */
router.post('/', createType);

/**
 * @swagger
 * /api/types/{id}:
 *  get:
 *    tags: [🎫 Types]
 *    summary: Get a single type.
 *    description: Get a single type.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The type id.
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success!
 *      400:
 *        description: No type found!
 *      500:
 *        description: Error!
 */
router.get('/:id', getTypeById);

/**
 * @swagger
 * /api/types/{id}:
 *  put:
 *    tags: [🎫 Types]
 *    summary: Update a type by id.
 *    description: Update a type by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The type id.
 *      - in: body
 *        name: type
 *        description: The type to update.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - slug
 *            - description
 *            - technologies
 *          properties:
 *            name:
 *              type: string
 *              example: Development Stack
 *            slug:
 *              type: string
 *              example: development-stack
 *            description:
 *              type: string
 *              example: The development stack used in the project
 *            technologies:
 *              type: array
 *              items:
 *               type: string
 *               example: 5f7f1b7a7e5f9a2b1c7d1b1a
 *    responses:
 *      200:
 *        description: type updated successfully!
 *      400:
 *        description: No type updated!
 *      500:
 *        description: Error!
 */
router.put('/:id', updateTypeById);

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     tags: [🎫 Types]
 *     summary: Delete a type by ID.
 *     description: Delete a type by its unique ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the type to delete.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: type deleted successfully!
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
 *         description: No type deleted!
 *       500:
 *         description: Error!
 */
router.delete('/:id', deleteTypeById);

module.exports = router;
