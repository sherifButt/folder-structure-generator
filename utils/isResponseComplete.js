/**
 * @module isResponseComplete - See {@tutorial howtouse}
 * @description Checks if the response is incomplete.
 */

/**
 * Check if the response is incomplete
 * @property {string } response The response to check.
 * @returns {boolean}  Returns true if the response is incomplete, false otherwise.
 */
 const isResponseComplete = (response) => {
    // Remove code block backticks for checking
    const sanitizedResponse = response.replace(/```/g, '');


    // Count of opening and closing JSX tags
    let openingTagsCount = (sanitizedResponse.match(/<[^/][^>]*>/g) || []).length;
    let closingTagsCount = (sanitizedResponse.match(/<\/[^>]*>/g) || []).length;

    if (openingTagsCount > closingTagsCount) {
        console.log('Opening and closing JSX tags do not match.')
        return true;
    }


    // Check for incomplete JavaScript statements
    if (!sanitizedResponse.trim().endsWith(';') && !sanitizedResponse.trim().endsWith('}') && (!sanitizedResponse.includes('export default') || !sanitizedResponse.includes('express'))) {
        console.log('Missing semicolon, closing bracket, or export default.')
        return true;
    }

    // Check for unbalanced parenthesis, brackets, and braces
    if ((sanitizedResponse.match(/\(/g) || []).length > (sanitizedResponse.match(/\)/g) || []).length ||
        (sanitizedResponse.match(/\[/g) || []).length > (sanitizedResponse.match(/\]/g) || []).length ||
        (sanitizedResponse.match(/{/g) || []).length > (sanitizedResponse.match(/}/g) || []).length) {
        console.log('Unbalanced parenthesis, brackets, or braces.')
        return true;
    }

    // Check for incomplete control flow structures
    ['if', 'for', 'while', 'switch', 'try'].forEach(keyword => {
        if (sanitizedResponse.includes(keyword + ' (') && !sanitizedResponse.includes(keyword + ') ')) {
            console.log('Incomplete control flow structure.')
            return true;
        }
    });

    // If the response ends with a 'export default' statement, it is complete.
    // if (sanitizedResponse.trim().endsWith('export default') || sanitizedResponse.trim().endsWith('}')|| sanitizedResponse.trim().endsWith(';')) {
    //     return false; 
    // }
    console.log('Response is complete.')
    return false;
}

/**
 * Check if the response code is incomplete
 * @property {string} response - The response to check.
 * @returns {boolean} - Returns true if the response is incomplete, false otherwise.
 */
 const isJsonComplete = (response) => {
    // Remove code block backticks for checking
    const sanitizedResponse = response.replace(/```/g, '');
    // Check for incomplete JSON
    let isJsonComplete = false;
    try {
        // Ignore JSON check if response is not meant to be JSON
        if ((sanitizedResponse.match(/{/g) || []).length !== (sanitizedResponse.match(/}/g) || []).length ||
            (sanitizedResponse.match(/\[/g) || []).length !== (sanitizedResponse.match(/]/g) || []).length) {
            return true;
        } else if (sanitizedResponse.includes('{') || sanitizedResponse.includes('[')) {
            JSON.parse(sanitizedResponse);
        }
    } catch (e) {
        return true;
    }
    return false
}

/**
 * Check if the input is a code block
 * @property {string} response - The response to check.
 * @returns {boolean} - Returns true if the response is a code block, false otherwise.
 */
 const isCodeBlock = (response) => {
    const startMarker = "```jsx";
    const endMarker = "```";
    const startMarkerIndex = response.indexOf(startMarker);

    if (startMarkerIndex === -1) {
        // Marker not found in the response
        return false;
    } else {
        // Marker found, remove everything before it and the marker itself
        const cleanedInput = response.substring(startMarkerIndex + startMarker.length);

        // Check if endMarker is still present
        return cleanedInput.indexOf(endMarker) === -1;
    }
}
module.exports = { isResponseComplete, isJsonComplete, isCodeBlock };