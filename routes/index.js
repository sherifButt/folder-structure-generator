const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const jwtReadOnlyMiddleware = require('../middleware/jwtReadOnlyMiddleware');

router.use('/users',jwtMiddleware, require('./userRouts'));
router.use('/generate-structure',jwtReadOnlyMiddleware, require('./generateStructureRouts'));
router.use('/types',jwtReadOnlyMiddleware, require('./typeRoutes'));
router.use('/technologies',jwtReadOnlyMiddleware, require('./technologyRouts'));
router.use('/tags',jwtReadOnlyMiddleware, require('./tagRouts'));
router.use('/dependencies',jwtReadOnlyMiddleware, require('./dependenceRouts'));
router.use('/auth', require('./authRouts'));
router.use('/swagger.json', require('./swaggerRouts'));
module.exports = router;
