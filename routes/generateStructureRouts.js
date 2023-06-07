const express = require('express');
const router = express.Router();
const { createFolderStructure, getAllFolders } = require('../controllers/generateStructureController');
const { uploadedFileHandler, payloadHandler, directoryHandler, zipHandler } = require('../middleware/structureFileGeneratorMiddleware')
const multer = require('multer');

// Configure Multer to store the uploaded file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/**
 * @swagger
 * /api/generate-structure:
 *  post:
 *    tags: [🗂 GenerateStructure]
 *    summary: Create a new folder structure.
 *    description: Create a new folder structure.
 *    parameters:
 *      - in: body
 *        name: folderStructure
 *        description: The folder structure to create.
 *        schema:
 *          type: object
 *          required:
 *            - structureFile
 *          properties:
 *            structureFile:
 *              type: file
 *              format: binary
 *    responses:
 *      201:
 *        description: Folder structure created successfully!
 *      400:
 *        description: No folder structure created!
 *      401:
 *        description: Unauthorized!
 *      500:
 *        description: Error!
 */

router.post('/',upload.single('structureFile'), uploadedFileHandler, payloadHandler, directoryHandler, zipHandler, createFolderStructure)

/**
 * @swagger
 * /api/generate-structure:
 *  get:
 *    tags: [🗂 GenerateStructure]
 *    summary: Get all folders.
 *    description: Get all folders.
 *    responses:
 *      200:
 *        description: Success!
 *      401:
 *        description: Unauthorized!
 *      500:
 *        description: Error!
 */
router.get('/', getAllFolders);




module.exports = router;