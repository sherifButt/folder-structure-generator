const express = require('express')
const router = express.Router()
const {
   uploadedDirectoryHandler, getAllDirectories, getDirectoryById, updateDirectoryById, deleteDirectoryById
} = require('../controllers/uploadDirectoryController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'public/cache/');
   },
   filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   }
 });
 
// Configure Multer to store the uploaded file in the local filesystem
const upload = multer({ storage: storage });

/**
 * @swagger
 * /directory-upload:
 *   post:
 *     summary: Uploads a directory
 *     description: This can be used to upload a directory. The directory can either be a local zip file, a GitHub repository or a zipped file from a URL. If a GitHub repository or a zipped file from a URL is being uploaded, the URL needs to be sent in the request body.
 *     tags: [📂 Directories]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The zip file to upload
 *               url:
 *                 type: string
 *                 description: The URL of the GitHub repository or zipped file
 *     responses:
 *       '201':
 *         description: Directory structure stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Directory'
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Directory structure stored successfully!
 *       '400':
 *         description: No directory was uploaded or URL provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No directory was uploaded or url provided. Please provide a valid structure directory or a valid url.
 *                 status:
 *                   type: integer
 *                   example: 400
 *       '500':
 *         description: Failed to store directory structure to DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to store directory structure to DB.
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 */


router.post( '/', upload.single('structureDirectory'), uploadedDirectoryHandler)

/**
 * @swagger
 * /directories:
 *   get:
 *     summary: Get all directories with pagination and filtering
 *     tags: [📂 Directories]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: The number of the page to retrieve, starts from 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting order (e.g., '-createdAt' for descending order by creation date)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: The field to filter by
 *       - in: query
 *         name: filterValue
 *         schema:
 *           type: string
 *         description: The value for the filter field
 *       - in: query
 *         name: selectFields
 *         schema:
 *           type: string
 *         description: Fields to include in the response (separated by commas) Example '_id,originalname,snippet.README.description'.
 *     responses:
 *       200:
 *         description: A list of directories along with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     pageNumber:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     nextPage:
 *                       type: integer
 *                     prevPage:
 *                       type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Directory'
 *       400:
 *         description: Bad request
 *       404:
 *         description: No directories found with the given filter
 */
router.get( '/', getAllDirectories )

/**
 * @swagger
 * /api/directories/{id}:
 *   get:
 *     tags:
 *       - 📂 Directories
 *     summary: Get a directory by ID
 *     description: Retrieves a specific directory by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The directory ID.
 *       - in: query
 *         name: selectFields
 *         schema:
 *           type: string
 *         description: Fields to be selected. Default is all fields. Example '_id,originalname,snippet.README.description'.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Directory retrieved successfully!
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Directory'
 *       404:
 *         description: No directory found with this ID.
 *     security:
 *       - Bearer: []
 */
router.get( '/:id', getDirectoryById )

/**
 * @swagger
 * /api/directory/{id}:
 *   put:
 *     summary: Update directory by ID
 *     description: Update any field of a directory by providing its ID. Unprovided fields will not be changed.
 *     tags: [📂 Directories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the directory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalname:
 *                 type: string
 *               encoding:
 *                 type: string
 *               mimetype:
 *                 type: string
 *               destination:
 *                 type: string
 *               filename:
 *                 type: string
 *               path:
 *                 type: string
 *               size:
 *                 type: number
 *               description:
 *                 type: string
 *               snippet:
 *                 type: object
 *               uploader:
 *                 type: string
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *               Files:
 *                 type: array
 *                 items:
 *                   type: string
 *               Directories:
 *                 type: array
 *                 items:
 *                   type: string
 *               date:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       200:
 *         description: The directory was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Directory'
 *       400:
 *         description: No directory found with this ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 error:
 *                   type: string
 */
router.put('/:id',updateDirectoryById)

/**
 * @swagger
 * /directories/{id}:
 *   delete:
 *     summary: Delete a directory by its ID
 *     tags: [📂 Directories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the directory to delete
 *     responses:
 *       200:
 *         description: The directory was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the directory was deleted successfully
 *       404:
 *         description: No directory was found with the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                 status:
 *                   type: integer
 *                   description: The HTTP status code
 */
router.delete('/:id',deleteDirectoryById)

module.exports = router
