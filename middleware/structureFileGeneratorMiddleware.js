const { getPayloadFromFile, parsePayload, createOutputDir } = require('../helpers/structureFileHelpers');
const createStructure = require('../helpers/createStructure');
const { zipFolder } = require('../helpers/zipUtil');
const path = require('path');

const publicFolder = path.join(__dirname, '../public');
// extract the payload from the file
// parse the payload based on the mimetype
// @returns  {Object} The parsed payload
exports.uploadedFileHandler = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file was uploaded. Please provide a valid structure file.' });
    }

    req.payload = getPayloadFromFile(req.file);
    next();
};

exports.payloadHandler = async (req, res, next) => {
    try {
        const {folderStructure,messages,meta } = parsePayload(req.payload, req.file.mimetype);
        req.structure = folderStructure;
        req.messages = messages;
        req.meta = meta;
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.directoryHandler = async (req, res, next) => { 
    const outputDir = path.join(publicFolder, 'output');
    createOutputDir(outputDir);
    
    try { 
        await createStructure(outputDir, req.structure, req.messages);
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error creating directory structure: ' + error.message });
    }
};
 
exports.zipHandler = async (req, res, next) => {
    try {
        req.zipPath = await zipFolder(req.outputDir);
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Failed to zip the folder: ' + error.message });
    }
};
