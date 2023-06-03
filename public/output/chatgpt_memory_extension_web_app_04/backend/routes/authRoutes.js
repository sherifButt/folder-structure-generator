// Here's the complete implementation of authRoutes.js as per the instructions.


const NextAuth = require('next-auth');
const Providers = require('next-auth/providers');
const session = require('express-session');

const authRoutes = express.Router();

authRoutes.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

authRoutes.use(NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  database: process.env.DATABASE_URL
}));

module.exports = authRoutes;

// Here's the JSDoc for the exported `authRoutes`:


 * Sets up the routes for authentication.
 *
 * @typedef {import('express').Router} Router
 *
 * @type {Router} authRoutes
 */

// Here's the Swagger documentation for the authRoutes:


  post:
    summary: Authenticate user
    security: []
    requestBody:
      description: User credentials
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email:
                type: string
                format: email
              password:
                type: string
                format: password
    responses:
      200:
        description: User authenticated
      401:
        description: Invalid credentials
