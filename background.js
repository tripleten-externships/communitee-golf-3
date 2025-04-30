chrome.runtime.onInstalled.addListener(() => {
    chrome.notifications.getPermissionLevel((permission) => {
        if (permission !== 'granted'){
            console.log("Enable notifications");
        }
    });
});

chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.windows.getCurrent((window) => {
        chrome.windows.update(window.id, { focused: true });
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'NEW_MESSAGE') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: `New message from ${message.payload.sender}`,
            message: message.payload.content,
            requireInteraction: true
        });
    }
});