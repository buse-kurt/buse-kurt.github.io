// Get DOM elements
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const container = document.getElementById('container');
const result = document.getElementById('result');
const newImage = document.getElementById('newImage');

// Counter for "Hayır" button clicks
let noButtonClicks = 0;

// Handle "Evet" button click
yesButton.addEventListener('click', function() {
    // Hide the container
    container.classList.add('hidden');
    
    // Show the result
    result.classList.remove('hidden');
    
    // Set a celebration GIF
    newImage.src = 'https://i.postimg.cc/xCkFb9wS/heart.gif';
    newImage.alt = 'Celebration';
});

// Handle "Hayır" button click
noButton.addEventListener('click', function() {
    // Check if button has been clicked 4 or more times - if so, don't process
    if (noButtonClicks >= 4) {
        return; // Stop processing if already clicked 4 times
    }
    
    noButtonClicks++;
    
    // Make the button move randomly
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    
    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Increase button size each time
    const currentSize = 12 + (noButtonClicks * 2);
    yesButton.style.fontSize = currentSize + 'px';
    yesButton.style.padding = `${currentSize}px ${currentSize * 2}px`;
    
    // After 3 clicks, make "Hayır" button smaller
    if (noButtonClicks >= 3) {
        noButton.style.fontSize = '10px';
        noButton.style.padding = '8px 15px';
    }
    
    // After 4 clicks, disable the button
    if (noButtonClicks >= 4) {
        noButton.style.opacity = '0.5';
        noButton.style.cursor = 'not-allowed';
        noButton.disabled = true;
        noButton.style.pointerEvents = 'none';
    }
});

// Reset button position when mouse leaves
noButton.addEventListener('mouseleave', function() {
    setTimeout(() => {
        noButton.style.transform = 'translate(0, 0)';
    }, 300);
});

