// Here's an example implementation of authController.js with Express and NextAuth:

const express = require('express');
const { signIn, signUp } = require('next-auth');

const router = express.Router();

// Handles user sign-in
router.post('/signin', (req, res) => {
  signIn('credentials', { 
    email: req.body.email, 
    password: req.body.password 
  }).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// Handles user sign-up
router.post('/signup', (req, res) => {
  signUp('credentials', { 
    email: req.body.email, 
    password: req.body.password 
  }).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

module.exports = router;