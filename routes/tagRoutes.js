const express = require('express');
const router = express.Router();
const { getAllTags, createTag, getTagById, updateTagById, deleteTagById } = require('../controllers/tagController');

/**
 * @swagger
 * /api/tags:
 *  get:
 *    tags: [🏷 Tags]
 *    summary: Get all tags.
 *    description: Get all tags.
 *    responses:
 *      200:
 *        description: Success!
 *      500:
 *        description: Error!
 */
router.get('/', getAllTags);

/**
 * @swagger
 * /api/tags:
 *  post:
 *    tags: [🏷 Tags]
 *    summary: Create a new tag.
 *    description: Create a new tag, and return a token.  
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
 *              - owners
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
 *              owners:
 *               type: array
 *               items: 
 *                 type: string
 *    responses:
 *      201:
 *        description: Tag created successfully!
 *      400:
 *        description: No tag created!
 *      500:
 *        description: Error!
 */

router.post('/', createTag);

/**
 * @swagger
 * /api/tags/{id}:
 *  get:
 *    tags: [🏷 Tags]
 *    summary: Get a single tag.
 *    description: Get a single tag.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The tag id.
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success!
 *      400:
 *        description: No tag found!
 *      500:
 *        description: Error!
 */

router.get('/:id', getTagById);

/**
 * @swagger
 * /api/tags/{id}:
 *  put:
 *    tags: [🏷 Tags]
 *    summary: Update a tag by id.
 *    description: Update a tag by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The tag id.
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
 *              - owners
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
 *              owners:
 *               type: array
 *               items: 
 *                 type: string
 *    responses:
 *      200:
 *        description: Tag updated successfully!
 *      400:
 *        description: No tag updated!
 *      500:
 *        description: Error!
 */
router.put('/:id', updateTagById);

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     tags: [🏷 Tags]
 *     summary: Delete a tag by ID.
 *     description: Delete a tag by its unique ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the tag to delete.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Tag deleted successfully!
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
 *         description: No tag deleted!
 *       500:
 *         description: Error!
 */
router.delete('/:id', deleteTagById);

module.exports = router; 