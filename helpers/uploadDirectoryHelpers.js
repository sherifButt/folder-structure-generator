const unzipper = require('unzipper')
const fs = require('fs')
const path = require('path')
const getGpt = require('./getGpt')

/**
 * Unzips a directory and returns the path of the unzipped directory.
 * @param {String} zipPath - The path of the zipped directory.
 * @returns {Promise<String>} - The path of the unzipped directory.
 */
exports.unzipDirectory = zipPath => {
   const directoryPath = path.join(
      __dirname,
      '../public/uploads',
      path.basename(zipPath, '.zip')
   )
   return new Promise((resolve, reject) => {
      fs.createReadStream(zipPath)
         .pipe(unzipper.Extract({ path: directoryPath }))
         .on('close', () => resolve(directoryPath))
         .on('error', reject)
   })
}

/**
 * Reads a file and returns an object containing the file's path, extension, content, and a technical description.
 * @param {String} filePath - The path of the file.
 * @returns {Promise<Object>} - An object containing the file's path, extension, content, and a technical description.
 */
let fileNumber = 0;

const readFileContent = async filePath => {
   try {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const fileName = path.basename(filePath)
      const extension = path.extname(filePath)
      // explain this:
      const parsedPath = path.parse(filePath)

      // Call OpenAI GPT-3 here to generate a technical summary
      const messages = [
         {
            role: 'system',
            content:
               'You are ChatGPT-4, a large language model trained by OpenAI. As an experienced full stack web developer with 10 years of experience',
         },
         {
            role: 'user',
            content: `give me a technical summary of this file ${fileName}: ${fileContent}`,
         },
      ]
      // const { response, usage } = await getGpt(messages)
      // const description = response
      const description = 'This is a technical description'

       if (fileName === null || fileName === undefined) {
          throw new Error(
             `File name for path "${filePath}" cannot be null or undefined`
          )
       }

       if (extension === null || extension === undefined) {
          throw new Error(
             `Extension for file "${fileName}" cannot be null or undefined`
          )
       }
      return {
         id: '' ,
         path: filePath,
         extension,
         fileContent,
         description,
         position: {
            x: 0,
            y: 0,
         },
      }
      // return {
      //    light: {
      //       path: filePath,
      //       extension,
      //       fileContent: '',
      //       description: '',

      //    },
      //    full: {
      //       path: filePath,
      //       extension,
      //       fileContent,
      //       description,
      //    },
      // }
   } catch (err) {
      console.error(`Error reading file ${filePath}: ${err.message}`)
      throw err
   }
}

/**
 * Reads a directory and returns an object representing its structure.
 * @param {String} dirPath - The path of the directory.
 * @returns {Promise<Object>} - An object representing the structure of the directory.
 */

const readDirectory = async dirPath => {
   try {
      const directoryData = {}

       if (dirPath === null || dirPath === undefined) {
            throw new Error('Directory path cannot be null or undefined');
        }
      // Get the list of files and sub-directories from the current directory
      const files = fs.readdirSync(dirPath)

      // Iterate through the list of files and sub-directories
      for (let file of files) {
         // Ignore __MACOSX folder
         if (file === '__MACOSX') continue
         if (file === '.git') continue

         // Construct the full path of the current file or sub-directory
         const filePath = path.join(dirPath, file)

         // Check if the current item is a directory
         if (fs.statSync(filePath).isDirectory()) {
            // If it's a directory, recursively read its content
            directoryData[file] = await readDirectory(filePath)
         } else {
            // If it's a file, read its content

            // Parse the filename and the extension
            const parsedPath = path.parse(file)

            // fileNameWithoutExtension holds the filename without the extension
            const fileNameWithoutExtension = parsedPath.name

            // extensionWithoutDot holds the extension without the dot
            const extensionWithoutDot = parsedPath.ext.slice(1)

            directoryData[fileNameWithoutExtension] = {
               ...(await readFileContent(filePath)),
               extension: extensionWithoutDot,
            }
         }
      }

      return directoryData
   } catch (err) {
      console.error(`Error reading directory ${dirPath}: ${err.message}`)
      throw err
   }
}

/**
 * Creates a directory structure and returns it.
 * @param {String} directoryPath - The path of the directory.
 * @returns {Promise<Object>} - An object representing the structure of the directory.
 */
exports.createDirectoryStructure = async directoryPath => {
   try {
      const directoryData = await readDirectory(directoryPath)

      return {
         ...directoryData,
      }
   } catch (err) {
      console.error(
         `Error creating directory structure for ${directoryPath}: ${err.message}`
      )
      throw err
   }
}
