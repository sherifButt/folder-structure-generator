// Here's the code for authRoutes.js:

```
const express = require('express');
const NextAuth = require('next-auth');

const authRoutes = express.Router();

authRoutes.use(async (req, res, next) => {
  const session = await NextAuth.getSession({ req });
  req.session = session;
  next();
});

authRoutes.get('/api/auth/signin', async (req, res) => {
  const options = {
    site: process.env.NEXTAUTH_URL,
    redirect_uri: `${process.env.NEXTAUTH_URL}/dashboard`,
    callback_url: `${process.env.NEXTAUTH_URL}/api/auth/signin`,
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
  };
  await NextAuth.signin(options)(req, res);
});

authRoutes.get('/api/auth/signout', async (req, res) => {
  await NextAuth.signout()(req, res);
});

authRoutes.get('/api/auth/session', async (req, res) => {
  res.status(200).json({ session: req.session });
});

module.exports = authRoutes;
```

// Here's the JSDoc for authRoutes.js:

/**
 * Sets up the routes for authentication.
 * @module authRoutes
 * @requires express
 * @requires next-auth
 */

/**
 * Express router for authentication routes.
 * @type {object}
 * @const
 * @namespace authRoutes
 */

/**
 * Middleware that sets the session on the request object.
 * @function
 * @async
 * @memberof module:authRoutes
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */

/**
 * GET route for signin.
 * @function
 * @async
 * @memberof module:authRoutes
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

/**
 * GET route for signout.
 * @function
 * @async
 * @memberof module:authRoutes
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

/**
 * GET route for session.
 * @function
 * @async
 * @memberof module:authRoutes
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
