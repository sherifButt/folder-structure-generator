require('dotenv').config();
require('./config/db');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { errorHandler, notFoundError } = require('./middleware/errorMiddleware');
const responseFormatter = require('./middleware/responseFormatterMiddleware');
const {swaggerSpecJSON} = require('./middleware/swaggerSpecJSON');
const router = require('./routes');
const cors = require('cors');
// ts-check
// Configure Express to parse incoming JSON data

const app = express();

app.use(express.json());

/**
 * @file This file defines the routes for the Express server.
 * @author Sherif Butt
 * @see {@link https://expressjs.com/en/guide/routing.html|Express Routing}
 */

// Configure Multer to store the uploaded file in memory
/**
 * @swagger
 * components:
 *  schemas:
 *   Prompt:
 *   type: object
 *  required:
 *  - title
 * - description
 * properties:
 */
const corsOptions = {
    origin: 'http://192.168.1.181:3000', // replace with your client's origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
app.use(cors(corsOptions));
app.use('/config',express.static('docs/out/config'));
app.use('/docs',express.static('docs/out'));
app.use(responseFormatter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true, docExpansion: 'list' }));
app.use('/api', router);
app.use(notFoundError);
app.use(errorHandler);

// expose static files in the docs/out folder

// Set the listening port for the Express server 
const PORT = process.env.PORT || 3000; 


// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  
});
