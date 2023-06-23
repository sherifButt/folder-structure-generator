
// Select all pre elements
var preElements = document.querySelectorAll('pre');

// Detect if device is touch-enabled
var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

// Define the event to use
var clickEvent = isTouchDevice ? 'touchstart' : 'click';

// For each pre element
preElements.forEach(function (preElement) {
    // Get the code block inside the pre tag
    //   var codeBlock = preElement.querySelector('per');

    // Extract language type from the class attribute (assuming format 'language-javascript', 'language-python', etc.)
    // loop through all the classes and find the one that starts with 'lang-'
    var langType = '';
    for (var i = 0; i < preElement.classList.length; i++) {
        if (preElement.classList[i].startsWith('lang-')) {
            langType = preElement.classList[i].split('-')[1];
            
            break;
        }
    }



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

    var copyDiv = document.createElement('div');
    copyDiv.classList.add('copy');

    var copyIcon = document.createElement('i');
    copyIcon.classList.add('far', 'fa-copy');
    // copyIcon.style.color = 'color(srgb 0.2901 0.2902 0.2902)';
    copyDiv.appendChild(copyIcon);

    var copyTextSpan = document.createElement('span');
    copyTextSpan.classList.add('hover-text');
    copyTextSpan.textContent = 'Copy code';
    // copyTextSpan.style.color = 'color(srgb 0.2901 0.2902 0.2902)';
    copyDiv.appendChild(copyTextSpan);

    // Append the spans to the buttons div
    buttonsDiv.appendChild(closeSpan);
    buttonsDiv.appendChild(minimizeSpan);
    buttonsDiv.appendChild(maximizeSpan);


    // Append the buttons div to the header div
    headerDiv.appendChild(buttonsDiv);
    headerDiv.appendChild(copyDiv);
    // Append the header div to the window div
    windowDiv.appendChild(headerDiv);

    // Clone the pre element
    var clonedPre = preElement.cloneNode(true);

    // Append the pre element to the window div
    windowDiv.appendChild(clonedPre);

    // Replace the original pre element with the new structure
    preElement.parentNode.replaceChild(windowDiv, preElement);


    // Copy code to clipboard when the copy button is clicked
    copyDiv.addEventListener('click', function () {
        handleCopy(clonedPre.textContent, copyTextSpan, copyIcon, copyDiv);
    });
    
    // Also handle 'touchend' event
    if (isTouchDevice) {
        copyDiv.addEventListener('touchend', function () {
            handleCopy(clonedPre.textContent, copyTextSpan, copyIcon, copyDiv);
        });
    }
});

async function handleCopy(codeToCopy, copyTextSpan, copyIcon, copyDiv) {
    // Check if Clipboard API is supported
    if (!navigator.clipboard) {
        // Handle the error case
        failedCopy(copyTextSpan, copyIcon, copyDiv);
        return;
    }

    // Request permission if needed
    if (navigator.permissions) {
        try {
            var result = await navigator.permissions.query({ name: 'clipboard-write' });
            if (result.state !== 'granted' && result.state !== 'prompt') {
                failedCopy(copyTextSpan, copyIcon, copyDiv);
                return;
            }
        } catch (error) {
            // Browser doesn't support clipboard permissions, proceed with the copy attempt
        }
    }

    // Attempt to copy the text
    try {
        await navigator.clipboard.writeText(codeToCopy);
        // Success feedback
        successCopy(copyTextSpan, copyIcon, copyDiv);
    } catch (error) {
        // Fail feedback
        failedCopy(copyTextSpan, copyIcon, copyDiv);
    }
}

function successCopy(copyTextSpan, copyIcon, copyDiv) {
    copyTextSpan.textContent = 'Copied!'
    copyIcon.className = "";
    copyIcon.classList.add('far', 'fa-check');
    // copyIcon.style.color = 'green';
    // copyTextSpan.style.color = 'green';
    setTimeout(function () {
        copyTextSpan.textContent = 'Copy code';
        copyIcon.className = "";
        copyIcon.classList.add('far', 'fa-copy');
        copyIcon.style.color = '';
    copyTextSpan.style.color = '';
    }, 2000);
}

function failedCopy(copyTextSpan, copyIcon, copyDiv) {
    copyTextSpan.textContent = 'Copying failed! (Fix: Permissions)';
    copyIcon.className = "";
    copyIcon.classList.add('fas', 'fa-times');  // cross icon
    copyIcon.style.color = 'red';
    copyTextSpan.style.color = 'red';
    setTimeout(function () {
        copyTextSpan.textContent = 'Copy code';
        copyIcon.className = "";
        copyIcon.classList.add('far', 'fa-copy');
        copyIcon.style.color = '';
    copyTextSpan.style.color = '';
    }, 2000);
}