/**
 * @typedef {Object} Code
 * @property {string} codeBlocks - The code blocks extracted from the input string.
 * @property {string} cleanedResponse - The input string with the markdown and code blocks removed.
 * @property {string} noMarkdown - The input string with the markdown removed.
 * @property {string} noGpt - The input string with the gpt human like generated text removed.
 */

/**
 * Extracts code blocks from a string and returns an object with the code blocks and cleaned string.
 * @function
 * @param {string} response - The input string to extract code blocks from.
 * @returns {Code}  Different code blocks and cleaned string. 
 * @todo: add more examples
 * 
 * @example
 * const response = 
 * {
 *   code:       "const a = 1;\nconst b = 2;\nconst c = a + b;\nconsole.log(c);",
 *   cleanCode:  "const a = 1;\nconst b = 2;\nconst c = a + b;\nconsole.log(c);",
 *   noMarkdown: "const a = 1;\nconst b = 2;\nconst c = a + b;\nconsole.log(c);"
 *   };
 */
function cleanCode(response) {
    if (!response || typeof response !== 'string' || response.length === 0) {
        return {
            codeBlocks: '',
            cleanedResponse: '',
            noMarkdown: ''
        };
    }

    const startMarker = "```jsx";
    const endMarker = "```";
    const startMarkerIndex = response.indexOf(startMarker);

    // Marker found, remove everything before it and the marker itself
    let cleanedInput = response.substring(startMarkerIndex + startMarker.length);

    const endMarkerIndex = cleanedInput.indexOf(endMarker);

    // Marker found,remove everything after it and the marker itself
     cleanedInput = response.substring(0, endMarkerIndex);
    

    // Regular expression to match inline code blocks (e.g. `code`) and code blocks with multiple lines (e.g. ```code```).
    const codeRegex = /(```[^`]+```|`[^`]+`)/g;
    const codeMatches = response.match(codeRegex) || [];
    const codeBlocks = codeMatches.map(match => match.replace(/`{3}|`/g, '').trim());
    let cleanedResponse = response.replace(codeRegex, '');

    // Regular expression to match any remaining backticks that were not part of a code block.
    const unmatchedBackticksRegex = /`/g;
    const unmatchedBackticks = cleanedResponse.match(unmatchedBackticksRegex);
    if (unmatchedBackticks) {
        const unmatchedBackticksCount = unmatchedBackticks.length;
        // Remove any characters between unmatched backticks.
        cleanedResponse = cleanedResponse.replace(/`[^`]*`/g, match => {
            const backtickCount = match.match(/`/g).length;
            return backtickCount === unmatchedBackticksCount ? match : '';
        }); 
        // Remove any remaining unmatched backticks.
        cleanedResponse = cleanedResponse.replace(/`/g, ''); 
    }

    // remove entire lines if sarted with markdonw
    // let noMarkdown = response.replace(/^(#|##|###|####|#####|######|Sure,|Note|This|Here's|To|Here|Note:|```.*|```|---|___|\+|\-|\d\.|\d\)|\d\.)\s.*/gm, '');
       let noMarkdown = response.replace(/^(#|##|###|####|#####|######|Sure,|Note|This|Here's|To|Here|Note:|Please|Keep|In|It's|Let's|The|Firstly|Next,|Then,|Finally,|Don't|Remember|Be|Always|Also,|You|We|Once|After|Before|When|If|Given|Now|At|For|While|With|Without|Using|During|This|Here's|To|Here|Note:|```.*|```|---|___|\+|\-|\d\.|\d\)|\d\.|As|From|Consider|Such|However,|Indeed,|Importantly,|Make|Ensure|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Start|End|Above|Below|Beside|Under|Over|Within|Outside|Since|Until|Of|By|Into|Through|During|Before|After|Between|Because|So|According|Although|Despite|Regarding|Concerning|Whether|While|Where|There|Here|Can|Could|Would|Should|Must|May|Might|Will|And|Or|But|Not|That|Which|Who|Whom|Whose|Why|How|What|Wherever|Whenever|Whoever|Whichever|However|Whatever|Whenever)\s.*/gm, '');

       let noGpt = response.replace(/^(Sure,|Here's|It's|Let's|Firstly|Next,|Then,|Finally,|Don't|Remember|Be|Always|Also,|We|Once|After|Before|When|Given|Now)\s.*/gm, '');


    noMarkdown = noMarkdown.replace(/^```(?:\w+\n)?/, '');
    noMarkdown = noMarkdown.replace(/```$/, '');



    return {
        codeBlocks,  // array of code blocks
        cleanedResponse, // remove markdown and code blocks
        noMarkdown, // remove markdown except code blocks
        noGpt // remove gpt human like generated text such as "Sure, Here's, It's, Let's, Firstly, Next, Then, Finally, Don't, Remember, Be, Always, Also, We, Once, After, Before, When, Given, Now"
    };
}

module.exports = cleanCode; 