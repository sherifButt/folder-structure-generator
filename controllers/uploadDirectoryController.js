const fs = require('fs')
const simpleGit = require('simple-git')
const axios = require('axios')
const git = simpleGit()
const {
   unzipDirectory,
   createDirectoryStructure,
} = require('../helpers/uploadDirectoryHelpers')
const Directory = require('../models/Directory')
const emptyNestedStrings = require( '../utils/emptyNestedStrings' )

/**
 * Handles the uploaded directory and stores its structure in the database.
 * @param {Object} req - Express request object, contains either a file or a url in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>}
 * @throws {Object} - Returns an error object with a message and status if something goes wrong.
 * @async
 */
exports.uploadedDirectoryHandler = async (req, res, next) => {
   try {
      let directoryData, directoryEntry, result, zipPath, unzippedDirectoryPath

      if (req.file) {
         // Handling file upload case
         zipPath = req.file.path
         unzippedDirectoryPath = await unzipDirectory(zipPath)

         directoryData = await createDirectoryStructure(unzippedDirectoryPath)
      } else if (req.body.url) {
         // Handling url input case
         const url = req.body.url
         if (url.includes('github')) {
            // Handling github repository case
            const localPath = `../public/uploads/${Date.now()}`
            await git.clone(url, localPath)

            // Parsing repository name and owner from the URL
            const urlParts = url.split('/')
            const repoOwner = urlParts[urlParts.length - 2]
            const repoName = urlParts[urlParts.length - 1]

            // Fetching repository details from GitHub API
            const apiResponse = await axios.get(
               `https://api.github.com/repos/${repoOwner}/${repoName}`
            )
            const repoDescription = apiResponse.data.description

            // Since we cannot determine the size and name of the cloned repository, we are omitting them
            req.file = {
               originalname: repoName,
               destination: 'public/catch/',
               filename: repoName,
               path: localPath,
               description: repoDescription,
            }

            directoryData = await createDirectoryStructure(localPath)
         } else {
            // Handling zip file url case
            const response = await axios.get(url, {
               responseType: 'arraybuffer',
            })
            const buffer = Buffer.from(response.data, 'binary')
            const tempZipPath = '../public/uploads'
            fs.writeFileSync(tempZipPath, buffer)

            unzippedDirectoryPath = await unzipDirectory(tempZipPath)
            directoryData = await createDirectoryStructure(
               unzippedDirectoryPath
            )
         }
      } else {
         throw {
            message:
               'No directory was uploaded or url provided. Please provide a valid structure directory or a valid url.',
            status: 400,
         }
      }

      directoryEntry = {
         ...req.file,
         snippet: directoryData,
         description: 'This is a test directory',
         uploader: req.user,
      }

      const directory = new Directory(directoryEntry)
      result = await directory.save()

      if (!result)
         throw {
            message: 'Failed to store directory structure to DB.',
            statusCode: 500,
         }

      res.data = directory
      res.statusCode = 201
      res.message = 'Directory structure stored successfully!'

      next()
   } catch (err) {
      next(err)
   }
}
/**
 * The filter query is used to filter the documents returned from the
 * MongoDB collection based on certain criteria. In your case, you're
 * setting up a flexible filter that can be determined by the query
 * parameters in the URL.
 * You construct a regular expression (RegExp) using the filterValue
 * provided in the query parameters. This regex is case-insensitive
 * because of the 'i' flag.
 *
 * @route GET api/directories
 * @desc Get all directories
 * @access Public
 */

exports.getAllDirectories = async (req, res, next) => {
   try {
      const pageNumber = parseInt(req.query.pageNumber) || 1
      if (pageNumber < 1) {
         throw {
            message: 'Page number must be greater than zero.',
            statusCode: 400,
         }
      }

      const pageSize = parseInt(req.query.pageSize) || 20
      if (pageSize < 1) {
         throw {
            message: 'Page size must be greater than zero.',
            statusCode: 400,
         }
      }

      const offset = (pageNumber - 1) * pageSize
      const sort = req.query.sort || '-createdAt'
      const filter = req.query.filter
      const filterValue = req.query.filterValue || ''
      const filterRegex = new RegExp(filterValue, 'i')
      const filterQuery = filter ? { [filter]: filterRegex } : {}
      const selectFields = req.query.selectFields || ''
      const selectFieldsArray = selectFields.split(',').join(' ')

      // Get the total number of directories
      const totalItems = await Directory.find(filterQuery).countDocuments()

      // If no directories found with the given filter
      if (totalItems === 0) {
         throw {
            message: 'No directories found with the given filter.',
            statusCode: 404,
         }
      }

      // Calculate total pages
      const totalPages = Math.ceil(totalItems / pageSize)

      // If requested page number is greater than total pages
      if (pageNumber > totalPages) {
         throw {
            error: `No directories found on this page. You requested page ${pageNumber} however max number of pages is ${totalPages}`,
            statusCode: 400,
         }
      }

      // Get directories from DB with pagination
      let directories = await Directory.find(filterQuery)
         .select(selectFieldsArray)
         .sort(sort)
         .skip(offset)
         .limit(pageSize)
         .exec()

      // Check if light version is requested
      if (req.query.lightVersion === 'true') {
         directories.map(directory => {
            if (directory.snippet) {
               emptyNestedStrings(directory.snippet, ['extension'])
            }
         })
      }

      // Construct a pagination object
      const pagination = {
         totalItems,
         pageNumber,
         pageSize,
         totalPages,
         nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
         prevPage: pageNumber > 1 ? pageNumber - 1 : null,
      }

      res.data = {
         pagination,
         results: directories,
      }
      res.statusCode = 200
      res.message = `${totalItems} directories retrieved successfully!`
      next()
   } catch (err) {
      next(err)
   }
}
/**
 * 
 * @route GET api/directory-upload/{id}
 * @desc Get a directory by id 
 * @access Public 
 */
exports.getDirectoryById = async (req, res, next) => {
   try {
      const selectFields = req.query.selectFields || '' // GET /api/directories/{id}?selectFields=_id,originalname
      const selectFieldsArray = selectFields.split(',').join(' ')

      const directory = await Directory.findById( req.params.id ).
         select(
         selectFieldsArray
      )

      if (!directory)
         throw {
            message: 'No directory found with this ID.',
            status: 404,
         }

         // Check if light version is requested
      if (req.query.lightVersion === 'true') {
         
            if (directory.snippet) {
               emptyNestedStrings(directory.snippet, ['extension'])
            }
         
      }

      res.data = directory
      res.statusCode = 200
      res.message = 'Directory retrieved successfully!'
      next()
   } catch (err) {
      next(err)
   }
}

// PUT /api/directories/{id}
exports.updateDirectoryById = async (req, res, next) => {
   try {
      const updates = req.body

      // Flatten the update object to use dot notation
      const flattenUpdates = (obj, prefix = '') =>
         Object.keys(obj).reduce((acc, key) => {
            const pre = prefix.length ? prefix + '.' : ''
            if (
               typeof obj[key] === 'object' &&
               obj[key] !== null &&
               !Array.isArray(obj[key])
            ) {
               Object.assign(acc, flattenUpdates(obj[key], pre + key))
            } else {
               acc[pre + key] = obj[key]
            }
            return acc
         }, {})

      const flattenedUpdates = flattenUpdates(updates)

      // Find the directory and update it
      const directory = await Directory.findByIdAndUpdate(
         req.params.id,
         flattenedUpdates,
         { new: true }
      )

      if (!directory) {
         throw { message: 'No directory found with this ID.', status: 404 }
      }

      res.data = directory
      res.statusCode = 200
      res.message = 'Directory updated successfully!'
      next()
   } catch (err) {
      next(err)
   }
}

exports.deleteDirectoryById = async (req, res, next) => {
   try {
      const directory = await Directory.findByIdAndRemove(req.params.id)

      if (!directory)
         throw {
            message: 'No directory found with this ID.',
            status: 404,
         }

      res.statusCode = 200
      res.message = 'Directory deleted successfully!'
      next()
   } catch (err) {
      next(err)
   }
}
