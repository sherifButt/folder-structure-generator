
    // Select all pre elements
var preElements = document.querySelectorAll('pre');

// For each pre element
preElements.forEach(function(preElement) {
  // Get the code block inside the pre tag
//   var codeBlock = preElement.querySelector('per');

  // Extract language type from the class attribute (assuming format 'language-javascript', 'language-python', etc.)
  // loop through all the classes and find the one that starts with 'lang-'
    var langType = 'TEXT';
    for (var i = 0; i < preElement.classList.length; i++) {
        if (preElement.classList[i].startsWith('lang-')) {
            langType = preElement.classList[i].split('-')[1];
            console.log('langType :>> ', langType);
            break;
        }
    }
  
  console.log('langType :>> ', langType);

  // Create a new div with class "window"
  var windowDiv = document.createElement('div');
  windowDiv.classList.add('window');

  // Create a new div with class "header"
  var headerDiv = document.createElement('div');
  headerDiv.classList.add('header');

  // Add the language type to the header
  var langSpan = document.createElement('span');
  langSpan.classList.add('language-type');
  langSpan.textContent = langType.toUpperCase();
  headerDiv.appendChild(langSpan);

  // Create a new div with class "buttons"
  var buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons');

  // Create new spans for close, minimize, maximize and copy
  var closeSpan = document.createElement('span');
  closeSpan.classList.add('close');

  var minimizeSpan = document.createElement('span');
  minimizeSpan.classList.add('minimize');

  var maximizeSpan = document.createElement('span');
  maximizeSpan.classList.add('maximize');

  var copySpan = document.createElement('span');
  copySpan.classList.add('copy');
  copySpan.innerHTML = '&#128203;'; // You can replace this with any appropriate icon

  // Append the spans to the buttons div
  buttonsDiv.appendChild(closeSpan);
  buttonsDiv.appendChild(minimizeSpan);
  buttonsDiv.appendChild(maximizeSpan);
 

  // Append the buttons div to the header div
  headerDiv.appendChild(buttonsDiv);
  headerDiv.appendChild(copySpan);
  // Append the header div to the window div
  windowDiv.appendChild(headerDiv);

  // Clone the pre element
  var clonedPre = preElement.cloneNode(true);

  // Append the pre element to the window div
  windowDiv.appendChild(clonedPre);

  // Replace the original pre element with the new structure
  preElement.parentNode.replaceChild(windowDiv, preElement);

  // Copy code to clipboard when the copy button is clicked
  copySpan.addEventListener('click', function() {
    var codeToCopy = clonedPre.textContent;
    navigator.clipboard.writeText(codeToCopy).then(function() {
        alert('Code copied to clipboard!');
      // Success feedback: change the copy button color to green for 2 seconds
      copySpan.style.color = 'green';
      setTimeout(function() {
        copySpan.style.color = '';
      }, 2000);
    }, function() {
      // Fail feedback: change the copy button color to red for 2 seconds
      copySpan.style.color = 'red';
      setTimeout(function() {
        copySpan.style.color = '';
      }, 2000);
    });
  });
});