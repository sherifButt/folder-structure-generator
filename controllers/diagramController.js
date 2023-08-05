const express = require('express')
const router = express.Router()

const {
   unzipDirectory,
   createDirectoryStructure,
} = require('../helpers/uploadDirectoryHelpers')
const Directory = require('../models/Directory')
const emptyNestedStrings = require('../utils/emptyNestedStrings')
const createNodesAndEdges = require('../utils/createNodesAndEdges')

let diagrams = {} // This is a simple in-memory store for the diagrams

exports.createDiagram = async (req, res) => {
   const { snippet } = req.body
   const { nodes, edges } = createNodesAndEdges(snippet)
   const id = Date.now().toString() // Generate a unique ID for the diagram
   diagrams[id] = { nodes, edges }
   res.json({ id })
}

exports.getDiagrams = async (req, res, next) => {
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

      // Get the total number of diagrams
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
      let diagrams = await Directory.find(filterQuery)
         .select(selectFieldsArray)
         .sort(sort)
         .skip(offset)
         .limit(pageSize)
         .exec()

      // Check if light version is requested
      if (req.query.lightVersion === 'true') {
         diagrams.map(directory => {
            if (directory.snippet) {
               emptyNestedStrings(directory.snippet, ['extension','id'])
            }
         })
      }
       
      // Create nodes and edges for each directory
      diagrams = diagrams.map(directory => {
         const { nodes, edges } = createNodesAndEdges(directory.snippet)
         return { diagram: { nodes, edges } }
      })
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
         results: diagrams,
      }
      res.statusCode = 200
      res.message = `${totalItems} diagrams retrieved successfully!`
      next()
   } catch (err) {
      next(err)
   }
}

exports.getDiagram = async (req, res, next) => {
   try {
      console.log('test')
      const selectFields = req.query.selectFields || '' // GET /api/diagrams/{id}?selectFields=_id,originalname
      const selectFieldsArray = selectFields.split(',').join(' ')

      const directory = await Directory.findById(req.params.id).select(
         selectFieldsArray
      )

      if (!directory)
         throw {
            message: 'No directory found with this ID.',
            status: 404,
         }

      if (!directory.snippet)
         throw {
            message: 'No snippet found with this ID.',
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

exports.updateDiagram = async (req, res) => {
   const { id } = req.params
   const { snippet } = req.body
   const { nodes, edges } = createNodesAndEdges(snippet)
   diagrams[id] = { nodes, edges }
   res.json({ message: 'Diagram updated successfully' })
}

exports.deleteDiagram = async (req, res) => {
   const { id } = req.params
   delete diagrams[id]
   res.json({ message: 'Diagram deleted successfully' })
}
