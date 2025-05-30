import { getToken, formatBearerToken } from "./src/api/token";
import { MessageStream } from "./src/components/MessageSummaryList";

function getTokenAsync(): Promise<any> {
  return new Promise((resolve) => {
    getToken((tokenData) => {
      resolve(tokenData);
    });
  });
}

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

chrome.alarms.create("checkMessages", {
  periodInMinutes: 1,
});

// Add alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkMessages") {
    checkForNewMessages();
  }
});

// Add the check messages function
async function checkForNewMessages() {
  console.log("Checking for new messages...");
  try {
    const tokenData = await getTokenAsync();

    if (!tokenData || !tokenData.token) {
      console.log("User not logged in, skipping message check");
      return;
    }
    if (!tokenData || !tokenData.token) {
      console.log("User not logged in, skipping message check");
      return;
    }

    // Fetch messages
    const response = await fetch("http://localhost:8080/message-stream", {
      headers: {
        Authorization: formatBearerToken(tokenData.token),
      },
    });

    console.log("Response status:", response.status);
    const responseText = await response.text();
    console.log("Response body:", responseText);

    // Then try to parse it
    let messages;
    try {
      messages = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return;
    }

    if (messages && messages.length > 0) {
      // Get the unread count
      const totalUnreadMessages = messages.reduce(
        (sum: number, message: MessageStream) => {
          return sum + message.unreadCount;
        },
        0
      );

      if (totalUnreadMessages > 0) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon48.png",
          title: "New Messages",
          message: `You have ${totalUnreadMessages} unread message${
            totalUnreadMessages === 1 ? "" : "s"
          }`,
        });
      }
    }
  } catch (error) {
    console.error("Error checking for new messages:", error);
  }
}
// Existing message listener remains

chrome.runtime.onMessage.addListener(
  (message: { type: string; payload: { sender: string; content: string } }) => {
    if (message.type === "NEW_MESSAGE") {
      console.log("Creating notification for new message"); // Add debug log
      chrome.notifications.create(
        {
          type: "basic",
          iconUrl: "icons/icon48.png",
          title: `New message from ${message.payload.sender}`,
          message: message.payload.content,
          requireInteraction: true,
        },
        (notificationId) => {
          console.log("Notification created with ID:", notificationId); // Add debug log
        }
      );
    }
    return true; // Add this line to handle async operations
  }
);

function logError(errorMessage: any) {
  // You can replace this with more sophisticated logging (e.g., sending to a server)
  console.error("Error:", errorMessage);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "PASSWORD_CHANGE_REQUEST") {
    try {
      // Log the received message
      console.log("Received message: ", message);

      // Create the notification
      chrome.notifications.create(
        {
          type: "basic",
          iconUrl: "icons/icon48.png",
          title: "Password Change Request",
          message: `A verification link has been sent to your email. Please check your inbox.`,
        },
        (notificationId) => {
          if (chrome.runtime.lastError) {
            // If there's an error with creating the notification, log it
            logError(
              `Failed to create notification: ${chrome.runtime.lastError.message}`
            );
          } else {
            console.log("Notification created successfully:", notificationId);
          }
        }
      );
    } catch (error: any) {
      // If something goes wrong during execution, log the error
      logError(`Error in processing PASSWORD_CHANGE_REQUEST: ${error.message}`);
    }
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "checkMessages") {
    checkForNewMessages();
  }
});
