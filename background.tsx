chrome.runtime.onInstalled.addListener(() => {
    chrome.notifications.getPermissionLevel((permission: string) => {
      if (permission !== 'granted') {
        console.log("Enable notifications");
      }
    });
  });
  
  chrome.notifications.onClicked.addListener((notificationId: string) => {
    chrome.windows.getCurrent((window: chrome.windows.Window | undefined) => {
      if (window && window.id !== undefined) {
        chrome.windows.update(window.id, { focused: true });
      } else {
        console.error("No current window or window id available.");
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((message: { type: string; payload: { sender: string; content: string } }, sender, sendResponse) => {
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