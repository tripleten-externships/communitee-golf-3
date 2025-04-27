chrome.runtime.onInstalled.addListener(() => {
    chrome.notifications.getPermissionLevel((permission) => {
        if (permission !== 'granted'){
            console.log("Enable notifications");
        }
    });
});

chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.action.openPopup();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'NEW_MESSAGE') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/notification-logo.png',
            title: `New message from ${message.payload.sender}`,
            message: message.payload.content,
            requireInteraction: true
        });
    }
});