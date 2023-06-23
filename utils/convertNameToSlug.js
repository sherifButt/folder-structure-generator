// create jsdoc for this function
/**
 * Create slug from name function, with dash instead of spaces, 
 * lowercase, remove any special characters from the name, 
 * remove any spaces from the beginning or the end of the name 
 * and insure that one dash between words.
 * @function convertNameToSlug
 * @param {String} name  The name to create slug from
 * @returns {String} The slug created from the name
 * @example
 * // returns 'tag-slug'
 * const { convertNameToSlug } = require('../utils/convertNameToSlug');
 * convertNameToSlug('tag slug');
 * // returns 'tag-slug'
 * console.log(convertNameToSlug('  JavaScript & Python 101   '));
 * // returns 'javascript-python-101'
 */

function convertNameToSlug(name) {
    if (!name) {
        return '';
    }

    // Convert to lower case and trim spaces
    name = name.toLowerCase().trim();

    // Replace spaces with dash
    name = name.replace(/\s+/g, '-');

    // Remove any special characters
    name = name.replace(/[^\w\-]+/g, '');

    // Remove dashes at the start and end
    name = name.replace(/^-+|-+$/g, '');

    // Ensure only single dash between words
    name = name.replace(/-+/g, '-');

    return name;
}

module.exports = convertNameToSlug;


