/**
 * This script adds a copy button to all pre elements with the prettyprint class.
 * When the button is clicked, the code content will be copied to the clipboard.
 * @function addCopyButton
 * @returns {void}
 * @example
 * addCopyButton()
 * @tutorial copy-code
 * @author Sherif Butt
 * @mermaid 
 *  graph LR
 *    A((Document)) --> B(querySelectorAll<br>pre prettyprint);
 *    B --> C(forEach);
 *    C --> D(Create a<br>new button<br>element);
 *    D --> E(Add an event<br>listener to<br>copy the<br>code content<br>when the button<br>is clicked);
 *    E --> F(Show the<br>button when<br>mouse enters<br>the pre element);
 *    F --> G(Hide the<br>button when<br>mouse leaves<br>the pre element);
 *    G --> H(Append the<br>button to<br>the pre element);
 */

 (function addCopyButton() {
    document.querySelectorAll('pre.prettyprint').forEach((el) => {
        // Create a new button element
        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.style.display = 'none'; // Hide the button by default
        button.classList.add('copy-button');

        // Add an event listener to copy the code content when the button is clicked
        button.addEventListener('click', () => {
            const code = el.querySelector('code').textContent;
            const textarea = document.createElement('textarea');
            textarea.textContent = code;
            document.body.append(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            alert('Code copied to clipboard!');
        });

        // Show the button when mouse enters the pre element
        el.addEventListener('mouseenter', () => {
            button.style.display = 'block';
        });

        // Hide the button when mouse leaves the pre element
        el.addEventListener('mouseleave', () => {
            button.style.display = 'none';
        });

        // Append the button to the pre element
        el.append(button);
    });
})()
