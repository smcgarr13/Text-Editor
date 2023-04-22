const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
event.preventDefault();
window.deferredPrompt = event;
butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
butInstall.style.display = 'none';
const promptEvent = window.deferredPrompt;

if (!promptEvent) {
    return;
}

promptEvent.prompt();

const userChoice = await promptEvent.userChoice;

window.deferredPrompt = null;

console.log(`User response: ${userChoice.outcome}`);
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log(`App installed successfully:`, event);
});


// Get the install button element with id 'buttonInstall'
// Initialize logic for installing the PWA
// Add event handler to the 'beforeinstallprompt' event
// Perform necessary actions when the 'beforeinstallprompt' event is triggered
    // Prevent the mini-infobar from appearing on mobile
    // Store the event for later use
    // Show the install button
// Implement a click event handler on the 'butInstall' element
// Perform necessary actions when the install button is clicked
    // Implement a click event handler on the `butInstall` element
    // Hide the install button
    // Retrieve the stored deferredPrompt event
    // Show the browser's install prompt
    // Wait for the user's response
    // Reset the deferredPrompt variable
    // Log the user's response
// Add event handler for the 'appinstalled' event
    // Perform necessary actions when the PWA is successfully installed
    // Can add more actions after successful installation, if needed