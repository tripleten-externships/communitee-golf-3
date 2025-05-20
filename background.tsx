import { getToken, formatBearerToken } from './src/api/token';

chrome.runtime.onInstalled.addListener(() => {
  chrome.notifications.getPermissionLevel((permission: string) => {
    if (permission !== "granted") {
      console.log("Enable notifications");
    }
  });
});

chrome.notifications.onClicked.addListener(() => {
  chrome.windows.getCurrent((window: chrome.windows.Window | undefined) => {
    if (window && window.id !== undefined) {
      chrome.windows.update(window.id, { focused: true });
    } else {
      console.error("No current window or window id available.");
    }
  });
});

chrome.alarms.create('checkMessages', {
    periodInMinutes: 5
});

// Add alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkMessages') {
        checkForNewMessages();
    }
});

// Add the check messages function
async function checkForNewMessages() {
    try {
        // Use the getToken function from token.ts
        getToken((tokenData) => {
            if (!tokenData || !tokenData.token) {
                console.log('User not logged in, skipping message check');
                return;
            }

            fetch('http://localhost:5173/messages', {
                headers: {
                    'Authorization': formatBearerToken(tokenData.token)
                }
            })
            .then(response => response.json())
            .then(messages => {
                if (messages.hasNewMessages) {
                    chrome.runtime.sendMessage({
                        type: "NEW_MESSAGE",
                        payload: {
                            sender: "System",
                            content: "You have new messages!"
                        }
                    });
                }
            })
            .catch(error => console.error('Error checking messages:', error));
        });
    } catch (error) {
        console.error('Error checking messages:', error);
    }
}

// Existing message listener remains
chrome.runtime.onMessage.addListener(
  (message: { type: string; payload: { sender: string; content: string } }) => {
    if (message.type === "NEW_MESSAGE") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: `New message from ${message.payload.sender}`,
        message: message.payload.content,
        requireInteraction: true,
      });
    }
  }
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "PASSWORD_CHANGE_REQUEST") {
    // Show notification after form submission
    console.log("Received message: ", message);
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "Password Change Request",
      message: `A verification link has been sent to your email. Please check your inbox.`,
      requireInteraction: true,
    });
  }
});
chrome.notifications.create({
  type: "basic",
  iconUrl: "icons/icon48.png",
  title: "Test Notification",
  message: "This is a test notification!",
  requireInteraction: true,
});
