const extractCode = require('./cleanCode');

describe('extractCode function', () => {
    test('should extract code blocks and return an object with codeBlocks and cleanedResponse keys', () => {
        const response = 'This is some text with a code block:\n```const foo = "bar";```And here is some more text.';
        const expectedCodeBlocks = ['const foo = "bar";'];
        const expectedCleanedResponse = 'This is some text with a code block:\nAnd here is some more text.';
        const result = extractCode(response);
        expect(result.codeBlocks).toEqual(expectedCodeBlocks);
        expect(result.cleanedResponse).toEqual(expectedCleanedResponse);
    });

    test('should handle null or undefined input and return an empty object', () => {
        const response = null;
        const expected = { codeBlocks: [], cleanedResponse: '' };
        const result = extractCode(response);
        expect(result).toEqual(expected);
    });

    test('should handle empty string input and return an empty object', () => {
        const response = '';
        const expected = { codeBlocks: [], cleanedResponse: '' };
        const result = extractCode(response);
        expect(result).toEqual(expected);
    }
    );
    
});
