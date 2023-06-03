
const NextAuth = require('next-auth');

const authController = express.Router();

authController.post('/api/auth/signin', async (req, res) => {
  try {
    await NextAuth(req, res, { 
      // NextAuth configuration options here
    });
  } catch (error) {
    res.status(500).json({error: 'Unexpected error.'});
  }
});

authController.post('/api/auth/signup', async (req, res) => {
  try {
    await NextAuth(req, res, { 
      // NextAuth configuration options here
    });
  } catch (error) {
    res.status(500).json({error: 'Unexpected error.'});
  }
});

module.exports = authController;
