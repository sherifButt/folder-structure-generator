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
 *    parameters:
 *      - in: body
 *        name: type
 *        description: The type to create.
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
 *  patch:
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
