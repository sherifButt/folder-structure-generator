/**
 * This script will add a caption to each image in the content
 * The caption will be the alt text of the image
 * The caption will be styled with CSS to appear below the 
 * image and centered with a gray background and white text.
 * 
 * @function addImageCaption
 * @returns {void}
 * @example
 * addImageCaption()
 * @tutorial add-image-caption 
 * @todo Add a caption to each image in the content
 * @mermaid 
 * graph LR
 *  A((Document)) --> B(querySelectorAll<br>.content img);
 *  B --> C((forEach));
 *  C --> D(Create a<br>new div<br>element);
 *  D --> E(Add a class<br>to style<br>with CSS);
 *  E --> F(Append the<br>div as a<br>sibling element<br>after the img);
 *  F --> G(Add the<br>alt text<br>to the div);
 *  G --> H(Add a<br>number to<br>the caption);
 *  H --> I(Style the<br>caption with<br>CSS); 
 * 
 */
(function addImageCaption() {
    window.addEventListener('DOMContentLoaded', (event) => {
        // Get all images in .content
        var images = document.querySelectorAll('.content img');

        images.forEach((img, idx) => {
            var altText = img.getAttribute('alt');

            // Create a new div element for each alt text
            var div = document.createElement('div');
            div.innerHTML = `<b>Figure ${idx + 1} -</b> ${altText}`;
            div.classList.add('alt-text');  // Add a class to style with CSS

            // Append the div as a sibling element after the img
            img.parentNode.insertBefore(div, img.nextSibling);
        });
    });
})();
/**
 * This function adds a 'DOMContentLoaded' event listener to the window which 
 * finds all SVG elements within the '.content' class once the DOM is fully loaded. 
 * For each SVG, it retrieves the 'data-figcaption' attribute, creates a new 'div' 
 * element with the caption, and inserts this 'div' after the SVG element in the DOM.
 *
 * @example
 * // Assume the HTML structure is:
 * // <div class="content">
 * //   <svg data-figcaption="This is a test">...</svg>
 * // </div>
 * 
 * // After the function executes, the HTML structure will become:
 * // <div class="content">
 * //   <svg data-figcaption="This is a test">...</svg>
 * //   <div class="fig-caption"><b>Diagram 1 -</b> This is a test</div>
 * // </div>
 *
 * @returns {void}
 */

function addMermaidCaption() {

    // Get all Mermaid graphs in .content
    var mermaidGraphs = document.querySelectorAll('.content svg');
let count = 1;
    mermaidGraphs.forEach((graph, idx) => {
        var figCaption = graph.getAttribute('data-figcaption');
        const text = graph.parentElement.getElementsByTagName('text');
        if (text[text.length - 1]?.innerHTML) {
            const caption = text[text.length - 1]?.innerHTML || 'flow chart'

            // Create a new div element for each caption
            var div = document.createElement('div');
            div.innerHTML = `<b>Diagram ${count} -</b> ${caption}`;
            div.classList.add('chart-caption');  // Add a class to style with CSS

            // Append the div as a sibling element after the SVG
            graph.parentNode.insertBefore(div, graph.nextSibling);
            count++;
        }
    });

}

window.addMermaidCaption = addMermaidCaption;
