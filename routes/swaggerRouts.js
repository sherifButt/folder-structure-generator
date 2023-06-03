const swaggerSpec = require('../config/swagger.js'); // replace with path to your swagger.js file
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;