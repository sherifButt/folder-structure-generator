const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const authController = require('../controllers/authController');
const router = express.Router();
/**
 * @page SwaggerDocumentation
 * @example <caption>Swagger Documentation</caption>
 * {@link ./docs/out/swagger.html}
 */
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    tags: [🔓 Auth]
 *    summary: Login a user.
 *    description: Login a user.    
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                description: The user's username, should be at least 3 characters and contain only letters or numbers with no space between
 *                example: JohnDoe
 *              password:
 *                type: string
 *                description: The user's password, Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character of @$!%*?&
 *                example: Pa$*word123
 *    responses:
 *      201:
 *        description: Logged in successfully, returns token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCVI9...
 *      400:
 *        description: Username and password must be provided.
 *      401:
 *        description: Invalid username or password.
 *      404:
 *        description: User not found.
 *      500:
 *        description: Server error.
 */

router.post('/login', authController.loginUser);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [🔓 Auth]
 *     summary: Register a new user.
 *     description: Register a new user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username, should be at least 3 characters and contain only letters or numbers with no space between
 *                 example: JohnDoe
 *               email:
 *                 type: string
 *                 description: The user's email, a valid email address should look like this (youremail@domain.com)
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password, Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character of @$!%*?&
 *                 example: Pa$*word123
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation , Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character of @$!%*?&
 *                 example: Pa$*word123
 *     responses:
 *       200:
 *         description: Successfully registered user and returned JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token.
 *                   example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCVI9...
 *       400:
 *         description: Username and password are required.
 *       409:
 *         description: Username or email is already taken.
 *       500:
 *         description: Error in processing the request.
 */

router.post('/register', authController.registerUser);

// router.use(jwtMiddleware); // Apply JWT middleware to routes below

// Your protected routes go here

module.exports = router; 
