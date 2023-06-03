const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const jwtReadOnlyMiddleware = require('../middleware/jwtReadOnlyMiddleware');

router.use('/users',jwtMiddleware, require('./userRouts'));
router.use('/projects',jwtReadOnlyMiddleware, require('./projectRoutes'));
router.use('/generate-structure',jwtReadOnlyMiddleware, require('./generateStructureRouts'));
router.use('/tags',jwtReadOnlyMiddleware, require('./tagRouts'));
router.use('/dependencies',jwtReadOnlyMiddleware, require('./dependenceRouts'));
router.use('/auth', require('./authRouts'));
router.use('/swagger.json', require('./swaggerRouts'));
module.exports = router;
