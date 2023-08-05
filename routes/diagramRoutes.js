const express = require('express')
const router = express.Router()

const { createDiagram,getDiagrams, getDiagram, updateDiagram, deleteDiagram } = require( '../controllers/diagramController' )

router.post( '/', createDiagram )

/**
 * @swagger
 * /api/diagrams:
 *   get:
 *     summary: Retrieve a list of diagrams
 *     description: Retrieve a list of diagrams with pagination. You can specify the page number and page size. You can also filter the results by any field, sort the results by any field, and select specific fields to be returned. You can also request a light version of the diagrams.
 *     tags: [Diagrams]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: The page number.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The size of the page.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: The sort order.
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: The field to filter by.
 *       - in: query
 *         name: filterValue
 *         schema:
 *           type: string
 *         description: The value to filter by.
 *       - in: query
 *         name: selectFields
 *         schema:
 *           type: string
 *         description: The fields to be returned.
 *       - in: query
 *         name: lightVersion
 *         schema:
 *           type: boolean
 *         description: Whether to return a light version of the diagrams.
 *     responses:
 *       200:
 *         description: A list of diagrams was retrieved successfully.
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
 *                     type: object
 *                     properties:
 *                       diagram:
 *                         type: object
 *                         properties:
 *                           nodes:
 *                             type: array
 *                             items:
 *                               type: object
 *                           edges:
 *                             type: array
 *                             items:
 *                               type: object
 *       400:
 *         description: The request was invalid.
 *       404:
 *         description: No diagrams were found.
 */
router.get('/', getDiagrams)
router.get( '/:id', getDiagram )
router.put( '/:id', updateDiagram )
router.delete( '/:id', deleteDiagram )

module.exports = router