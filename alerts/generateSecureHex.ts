
/**
 * Creates a secure/ish hex string for the email verification uses, such as unsubscribe from alerts,
 * IMPORTANT: Never use this function to generate a secure random numbers for crypto purposes, such as passwords, salts, or keys.
 * @function
 * @param {number} code_length  Length of the code to be generated
 * @returns  {string} hex string
 * @link https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
 * @example
 * // returns 32 characters long hex string
 * generateSecureHex()
 */
const generateSecureHex = (code_length:number = 32): string => {
    const possible = process.env.UNSUBSCRIBE_SECRET_GENERATOR_POSSIBLE_VALUES || '0123456789abcdef';
    const hex = Array.from({ length: 64 }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
    return hex;
}

 export default generateSecureHex;