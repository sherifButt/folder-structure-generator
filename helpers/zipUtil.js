const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

/**
 *  Zip a folder
 * @param {string} folderPath - Path of the folder to zip
 * @returns {Promise<string>} - Path of the zipped folder
 * @throws {Error} - If the folder does not exist
 */

async function zipFolder(folderPath) {
  const zipFileName = `generated_structure_${Date.now()}.zip`;
  const zipFilePath = path.join(__dirname, zipFileName);

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip');

    output.on('close', () => {
      resolve(zipFilePath);
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

module.exports = { zipFolder };
