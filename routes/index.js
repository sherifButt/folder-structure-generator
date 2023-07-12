const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const jwtReadOnlyMiddleware = require('../middleware/jwtReadOnlyMiddleware');

router.use('/users',jwtMiddleware, require('./userRoutes'));
router.use('/generate-structure',jwtReadOnlyMiddleware, require('./generateStructureRoutes'));
router.use('/types',jwtReadOnlyMiddleware, require('./typeRoutes'));
router.use('/technologies',jwtReadOnlyMiddleware, require('./technologyRoutes'));
router.use('/tags',jwtReadOnlyMiddleware, require('./tagRoutes'));
router.use('/dependencies',jwtReadOnlyMiddleware, require('./dependenceRoutes'));
router.use('/auth', require('./authRoutes'));
router.use( '/swagger.json', require( './swaggerRoutes' ) );
router.use( '/directory-upload',jwtMiddleware, require('./uploadDirectoryRoutes'))
module.exports = router; 
