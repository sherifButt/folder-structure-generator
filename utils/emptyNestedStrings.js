// add jsdoc for the function below
/**
 * Empties all nested strings in an object. with the exception
 * of any strings in the exceptions array. 
 *  @function emptyNestedStrings
 * @param {object} obj - The object to empty nested strings from.
 * @param {array} exceptions - An array of strings to exclude from being emptied.
 * @returns {object} - The object with nested strings emptied. 
 */

function emptyNestedStrings(obj, exceptions = []) {
   for (let key in obj) {
      if (typeof obj[key] === 'string' && !exceptions.includes(key)) {
         obj[key] = ''
      } else if (typeof obj[key] === 'object') {
         emptyNestedStrings(obj[key], exceptions)
      }
   }
}

module.exports = emptyNestedStrings