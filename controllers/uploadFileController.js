const fs = require('fs')
// @route POST api/readFolderStructure
exports.readFolderStructure = (req, res) => {
   res.download(req.zipPath, err => {
      if (err) {
         res.status(500).send({
            message: 'Failed to download the zipped folder.',
         })
      }
      fs.unlinkSync(req.zipPath)
   })
}

// @route GET api/projects/:id
// @desc Get a single project
// @access Public
exports.getAllFolders = (req, res) => {
   res.send('Hello from generateStructure.js')
}
