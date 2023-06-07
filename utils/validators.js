/**
 * @module validators
 */
/**
 *  name validator,  name should be at least 3 characters 
 * long and contain only letters or numbers.
 * @function validateName
 * @param {String} Name  The  name to validate
 * @returns {Boolean} True if the  name is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateName } = require('../utils/validators');
 * validateName('name');
 * // returns true
 * validateName('pr');
 * // returns false
 */
exports.validateName = function (name) {
    // Check if the username is at least 3 characters long
    if (name.length < 3) return false;

    var re = /^[a-zA-Z0-9]+$/;
    return re.test(name)
}
/**
 * Slug validator, Slug should be at least 3 characters 
 * long and contain only letters, numbers or dashes, but
 * dashes not at the beginning or end.
 * @function validateSlug
 * @param {String} slug  The  slug to validate
 * @returns {Boolean} True if the  slug is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateSlug } = require('../utils/validators');
 * validateSlug('-slug');
 * // returns false
 * validateSlug('ta');
 * // returns false
 * validateSlug('slug-');
 * // returns false
 * validateSlug('slug');
 * // returns true
 * validateSlug('slug-slug');
 * // returns true
 * 
 */

exports.validateSlug = function (slug) {
    // Check if the username is at least 3 characters long

    if (slug.length < 3) return false;
// alphanumeric characters and dashes, but dashes not at the beginning or end
    var re = /^[a-zA-Z0-9]+$/;
    return re.test(slug)
}
/**
 * email validator, email should be in the form of "example@domain.com"
 * @function validateEmail
 * @param {String} email  The email to validate
 * @returns {Boolean} True if the email is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript|Stackoverflow - How to validate an email address in JavaScript}
 * @example
 * // returns true
 * const { validateEmail } = require('../utils/validators');
 * validateEmail('email@gmail.com');
 * // returns true
 * validateEmail('email_gmail.com');
 * // returns false
 */
exports.validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

/**
 * password validator, Minimum eight characters, at least one uppercase 
 * letter, one lowercase letter, one number and one special character
 * @function validatePassword
 * @param {String} password  The password to validate
 * @returns {Boolean} True if the password is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a|Stackoverflow - Regex for password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters}
 * @example
 * const { validatePassword } = require('../utils/validators');
 * validatePassword('Password1');
 * // returns false
 * validatePassword('password');
 * // returns false
 * validatePassword('Pa$');
 * // returns false
 * validatePassword('Pa$sword');
 * // returns true
 */
exports.validatePassword = function (password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password)
}

/**
 * username validator, username should be at least 3 characters 
 * long and contain only letters or numbers.
 * @function validateUsername
 * @param {String} username  The username to validate
 * @returns {Boolean} True if the username is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateUsername } = require('../utils/validators');
 * validateUsername('username');
 * // returns true
 * validateUsername('us');
 * // returns false
 */
exports.validateUsername = function (username) {
    // Check if the username is at least 3 characters long
    if (username.length < 3) return false;

    // Check if the username contains only letters or numbers
    var re = /^[a-zA-Z0-9]+$/;
    return re.test(username)
}

/**
 * project name validator, project name should be at least 3 characters 
 * long and contain only letters or numbers.
 * @function validateProjectName
 * @param {String} projectName  The project name to validate
 * @returns {Boolean} True if the project name is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateProjectName } = require('../utils/validators');
 * validateProjectName('projectName');
 * // returns true
 * validateProjectName('pr');
 * // returns false
 */
exports.validateProjectName = function (projectName) {
    // Check if the username is at least 3 characters long
    if (projectName.length < 3) return false;

    var re = /^[a-zA-Z0-9]+$/;
    return re.test(projectName)
}

/**
 * project meta name validator, project meta name should be at least 3 characters 
 * long and contain only letters or numbers.
 * @function validateProjectMetaName
 * @param {String} metaName  The project meta name to validate
 * @returns {Boolean} True if the project meta name is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateProjectMetaName } = require('../utils/validators');
 * validateProjectMetaName('metaName');
 * // returns true
 * validateProjectMetaName('me');
 * // returns false
 */
exports.validateProjectMetaName = function (metaName) {
    // Check if the username is at least 3 characters long
    if (metaName.length < 3) return false;

    var re = /^[a-zA-Z0-9]+$/;
    return re.test(metaName)
}


/**
 * tag name validator, tag name should be at least 3 characters 
 * long and contain only letters or numbers.
 * @function validateTag
 * @param {String} tag  The tag to validate
 * @returns {Boolean} True if the tag is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateTag } = require('../utils/validators');
 * validateTag('tag');
 * // returns false
 * validateTag('ta');
 * // returns false
 */
exports.validateTag = function (tag) {
    // Check if the username is at least 3 characters long
    if (tag.length < 3) return false;

    // alphanumeric characters and spaces
    var re = /^[a-zA-Z0-9 ]+$/;
    return re.test(tag)
}

// create jsdoc and swagger for this function
/**
 * tag slug validator, tag slug should be at least 3 characters 
 * long and contain only letters, numbers or dashes.
 * @function validateTagSlug
 * @param {String} tagSlug  The tag slug to validate
 * @returns {Boolean} True if the tag slug is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateTagSlug } = require('../utils/validators');
 * validateTagSlug('tag-slug');
 * // returns true
 * validateTagSlug('ta');
 * // returns false
 */
exports.validateTagSlug = function (tagSlug) {
    // Check if the username is at least 3 characters long
    if (tagSlug.length < 3) return false;

    var re = /^[a-zA-Z0-9-]+$/;
    return re.test(tagSlug)
}
/**
 * dependence name validator, dependence name should be at least 3 characters 
 * long and contain only letters or numbers.
 * @function validateDependence
 * @param {String} dependence  The dependence to validate
 * @returns {Boolean} True if the dependence is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example
 * // returns true
 * const { validateDependence } = require('../utils/validators');
 * validateDependence('dependence');
 * // returns false
 */
exports.validateDependence = function (dependence) {
    // alphanumeric characters and spaces
    var re = /^[a-zA-Z0-9 ]+$/;
    return re.test(dependence)
}

// create jsdoc and swagger for this function
/**
 * dependence slug validator, dependence slug should be at least 3 characters 
 * long and contain only letters, numbers or dashes.
 * @function validateDependenceSlug
 * @param {String} dependenceSlug  The dependence slug to validate
 * @returns {Boolean} True if the dependence slug is valid, false otherwise 
 * @see {@link https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username|Stackoverflow - Regular expression to validate username}
 * @example javascript
 * // returns true
 * const { validateDependenceSlug } = require('../utils/validators');
 * validateDependenceSlug('dependence-slug');
 * // returns false
 */
exports.validateDependenceSlug = function (dependenceSlug) {
    var re = /^[a-zA-Z0-9-]+$/;
    return re.test(dependenceSlug)
}
