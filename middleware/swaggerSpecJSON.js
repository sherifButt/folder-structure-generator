const fs = require('fs').promises;
const swaggerSpec = require('../config/swagger.js');
const path = require('path');

exports.swaggerSpecJSON = async (req, res, next) => {
    try {
        
        // convert js to json
        const swaggerSpecJSON = JSON.stringify(swaggerSpec);
        // set swagger.json file
        req.swaggerSpecJSON = swaggerSpecJSON;

        // save swagger.json file to docs/out/config/swagger.json
        await fs.writeFile(path.join(__dirname, '../docs/out/config/swagger.json'), swaggerSpecJSON);
        console.log('swagger.json file saved!');
        
        next();
    } catch (err) {
        next({ message: 'swagger.json file not saved!', status: 500, error: err });
    }
}
