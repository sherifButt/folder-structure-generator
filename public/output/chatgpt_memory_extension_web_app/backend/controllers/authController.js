

/**
 * signIn - Controller for user sign-in
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await nextAuthSignIn('credentials', { email, password });

    if (result.error) {
      res.status(401).json({ message: result.error });
    } else {
      res.status(200).json({ message: 'Signed in successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during sign-in' });
  }
};

/**
 * signUp - Controller for user sign-up
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await nextAuthSignUp('credentials', { email, password });

    if (result.error) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(201).json({ message: 'Signed up successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during sign-up' });
  }
};

module.exports = {
  signIn,
  signUp,
};
