const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Get the payload from the file
 * @param {String} file  The file to read
 * @returns  {Object} The payload
 * @throws {Error} - The file must be a valid object.
 * 
 */
exports.getPayloadFromFile = (file) => {
    return file.buffer.toString('utf-8');
};

/**
 * Parse the payload based on the mimetype 
 * @function parsePayload  
 * @param {Object} payload  The payload to parse
 * @param {String} mimetype  The mimetype of the payload
 * @returns  {Object} The parsed payload 
 * @throws {Error} - Unsupported structure file format. Please use a .json or .yml file.
 * @throws {Error} - The payload must be a valid object.
 * @throws {Error} - The mimetype must be a valid string.
 * 
 */
exports.parsePayload = (payload, mimetype) => {
    
    // determine the file extension based on mimetype
    const extension = mimetype === 'application/json' ? '.json' : mimetype === 'application/x-yaml' ? '.yaml' : null;

    if (!extension) {
        throw new Error('Unsupported structure file format. Please use a .json or .yml file.');
    }

    if (extension === '.json') {
        console.log(JSON.parse(payload))
        return JSON.parse(payload);
    } else if (extension === '.yml' || extension === '.yaml') {
        return yaml.safeLoad(payload);
    }
};

/**
 * Create an output directory if it does not exist 
 * @function createOutputDir
 * @param {String} dir  The directory to create
 * @returns {void}
 */
exports.createOutputDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};


