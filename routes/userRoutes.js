const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *  get:
 *    tags: [👥 Users]
 *    summary: Get all users.
 *    description: Get all users.
 *    responses:
 *      200:
 *        description: Success!
 *      500:
 *        description: Error!
 */
router.get('/', getAllUsers);

/**
 * swagger
 * /api/users:
 *  post:
 *    tags: [👥 Users]
 *    summary: Create a new user.
 *    description: Create a new user.
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
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
 *        description: User created successfully!
 *      400:
 *        description: No user created!
 *      500:
 *        description: Error!
 */
// router.post('/', createUser); // creating user is job of auth controller

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    tags: [👥 Users]
 *    summary: Get a single user.
 *    description: Get a single user.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The user id.
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success!
 *      400:
 *        description: No user found!
 *      500:
 *        description: Error!
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *  patch:
 *    tags: [👥 Users]
 *    summary: Update a user by id.
 *    description: Update a user by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id.
 *      - in: body
 *        name: user
 *        description: The user to update.
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
 *        description: User updated successfully!
 *      400:
 *        description: No user updated!
 *      500:
 *        description: Error!
 */
router.put('/:id', updateUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [👥 Users]
 *     summary: Delete a user by ID.
 *     description: Delete a user by its unique ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User deleted successfully!
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
 *         description: No user deleted!
 *       500:
 *         description: Error!
 */
router.delete('/:id', deleteUserById);

module.exports = router; 
