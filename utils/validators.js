/**
 * @module validators
 */
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
 * // returns true
 * const { validatePassword } = require('../utils/validators');
 * validatePassword('Password1');
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
 */
exports.validateUsername = function (username) {
    // Check if the username is at least 3 characters long
    if (username.length < 3)  return false;
    
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
 */
exports.validateProjectName = function (projectName) {
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
 */
exports.validateProjectMetaName = function (metaName) {
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
 */
exports.validateTag = function (tag) {
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
 */
exports.validateTagSlug = function (tagSlug) {
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
 * @example
 * // returns true
 * const { validateDependenceSlug } = require('../utils/validators');
 * validateDependenceSlug('dependence-slug');
 */
exports.validateDependenceSlug = function (dependenceSlug) {
    var re = /^[a-zA-Z0-9-]+$/;
    return re.test(dependenceSlug)
}
