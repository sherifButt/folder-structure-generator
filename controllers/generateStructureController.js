// @route DELETE api/projects/:id
// @desc Delete a single project
// @access Public
exports.createFolderStructure = (req, res) => {
    res.download(req.zipPath, (err) => {
        if (err) {
            res.status(500).send({ error: 'Failed to download the zipped folder.' });
        }
        fs.unlinkSync(req.zipPath);
    });
}

// @route GET api/projects/:id
// @desc Get a single project
// @access Public
exports.getAllFolders =  (req, res) => { 
    res.send('Hello from generateStructure.js')
}