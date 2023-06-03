// Here's the code for authMiddleware.js file:


const { getSession } = require('next-auth/client');

/**
 * Express middleware to protect routes that require authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function protect(req, res, next) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = session.user;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { protect };

