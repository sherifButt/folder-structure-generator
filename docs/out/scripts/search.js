/**
 * Search function
 * @function
 * @name search
 * @param {string} input - The input element
 * @param {string} targets - The targets to search in
 * @returns {void}
 * @example
 * search(input, targets)
 * @tutorial search
 * @todo Add a search function
 * @mermaid
 * graph LR
 * A((Document)) --> B(querySelector<br>#search);
 * B --> C((addEventListener<br>keyup));
 * C --> D((forEach<br>targets));
 * D --> E(if<br>target.innerText<br>includes<br>input.value);
 * E --> F(show<br>target);
 * F --> G(else);
 * G --> H(hide<br>target);
 * H --> I(if<br>list.length<br>=== 0);
 * I --> J(hide<br>list);
 * J --> K(hide<br>list's<br>title);
 * K --> L(if<br>category.length<br>=== 0);
 * L --> M(hide<br>category);
 * M --> N(hide<br>category's<br>title);
 * N --> O(else);
 * O --> P(show<br>target);
 * 
 * 
 *  
 *
 */
(function() {
  const input = document.querySelector('#search')
  const targets = [ ...document.querySelectorAll('#sidebarNav li')]
  input.addEventListener('keyup', () => {
    // loop over each targets and hide the not corresponding ones
    targets.forEach(target => {
      if (!target.innerText.toLowerCase().includes(input.value.toLowerCase())) {
        target.style.display = 'none'

        /**
         * Detects an empty list
         * Remove the list and the list's title if the list is not displayed
         */
        const list = [...target.parentNode.childNodes].filter( elem => elem.style.display !== 'none')

        if (!list.length) {
          target.parentNode.style.display = 'none'
          target.parentNode.previousSibling.style.display = 'none'
        }

        /**
         * Detects empty category
         * Remove the entire category if no item is displayed
         */
        const category = [...target.parentNode.parentNode.childNodes]
          .filter( elem => elem.tagName !== 'H2' && elem.style.display !== 'none')

        if (!category.length) {
          target.parentNode.parentNode.style.display = 'none'
        }
      } else {
        target.parentNode.style.display = 'block'
        target.parentNode.previousSibling.style.display = 'block'
        target.parentNode.parentNode.style.display = 'block'
        target.style.display = 'block'
      }
    })
  })
})()