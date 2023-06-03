const fs = require('fs');
const swaggerSpec = require('../config/swagger.js');
const path = require('path');

exports.swaggerSpecJSON = (req, res, next) => {
    try{// convert js to json
    const swaggerSpecJSON = JSON.stringify(swaggerSpec);
    // set swagger.json file
    req.swaggerSpecJSON = swaggerSpecJSON;
    // save swagger.json file to docs/out/config/swagger.json
    fs.writeFile(path.join(__dirname, '../docs/out/config/swagger.json'), swaggerSpecJSON, (err) => {
        if (err) throw err;
        console.log('swagger.json file saved!');
    });


   

    next();} catch (err) {
        next(err)
    }
}