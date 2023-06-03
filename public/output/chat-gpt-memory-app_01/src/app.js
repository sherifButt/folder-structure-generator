// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./src/api/middlewares/errorHandler");
const promptsRoutes = require("./src/api/routes/promptsRoutes");
const memoryRoutes = require("./src/api/routes/memoryRoutes");

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Set up routes
app.use("/prompts", promptsRoutes);
app.use("/memory", memoryRoutes);

// Set up error handling middleware
app.use(errorHandler);

module.exports = app;
```

Note: This code sets up the Express app, applies middleware, sets up routes, and adds error handling middleware. It imports the necessary dependencies and exports the app for use in other files.