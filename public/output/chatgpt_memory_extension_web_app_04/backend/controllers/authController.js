// Sure, here's an example implementation of authController.js:


const nextAuth = require('next-auth')
const { signIn, signUp } = require('../models/authModel')

const router = express.Router()

router.post('/api/auth/signin', async (req, res) => {
  try {
    const result = await signIn(req.body.email, req.body.password)
    if (result) {
      const session = await nextAuth.getSession({ req })
      res.status(200).json({ session })
    } else {
      res.status(400).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

router.post('/api/auth/signup', async (req, res) => {
  try {
    const result = await signUp(req.body.email, req.body.password)
    if (result) {
      const session = await nextAuth.getSession({ req })
      res.status(200).json({ session })
    } else {
      res.status(400).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = {
  signIn,
  signUp
}
