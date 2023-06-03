/**
 * Transforms mermaid diagrams written in markdown into interactive diagrams.
 * Iterates through all HTML elements with the 'lang-mermaid' class, gets their content,
 * and renders it into a diagram using the mermaid API. Replaces the original markdown
 * element with the newly created diagram.
 * @function renderMermaidLangs
 * @example
 * // Assuming there are HTML elements with 'lang-mermaid' class and valid mermaid definitions.
 * renderMermaidLangs();
 * 
 * @mermaid
 *  flowchart TD
 *    A[Start] --> B{Is it working?}
 *    B -->|Yes| C[Finish]
 *    B -->|No| D[Fix it and go back to start]
 *    D --> A
 */
function renderMermaidLangs() {
  [...document.querySelectorAll('.lang-mermaid')]
    .forEach((markdownGraphEl, i) => {
      const graphDefinition = markdownGraphEl.innerText

      const cb = function (graphHTML) {
        const graphContainerEl = document.createElement('div')
        graphContainerEl.innerHTML = graphHTML
        const graphEl = graphContainerEl.querySelector('svg')

        graphEl.style.display = 'block'
        graphEl.style.margin = '0 auto'
        graphContainerEl.style.margin = '50px 0'

        markdownGraphEl.replaceWith(graphContainerEl)
      }
      
      window.mermaid.render(`mermaid_graph_${i}`, graphDefinition, cb)
    })
}

function loadMermaid() {
  const mermaidjs = document.createElement('script')
  mermaidjs.src = 'https://cdn.jsdelivr.net/npm/mermaid@9.4.3/dist/mermaid.min.js'
  document.body.appendChild(mermaidjs)

  mermaidjs.addEventListener('load', () => {
    renderMermaidLangs();
// Make sure addMermaidCaption is defined before invoking
if (window.addMermaidCaption) {
  window.addMermaidCaption();
}
  });
}


document.addEventListener('DOMContentLoaded', loadMermaid);