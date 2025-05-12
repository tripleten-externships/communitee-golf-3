const TOKEN_KEY = "jwt";

// Define the structure of the token data with expiration
interface TokenData {
  token: string;
  expiresAt: number;
}

// Helper function to format the token as a Bearer token
export function formatBearerToken(token: string | null): string {
  return token ? `Bearer ${token}` : "";
}

// Store the token with expiration information in chrome.storage.local
export const setToken = (token: string, expirationHours: number = 24): void => {
  const expiresAt = Date.now() + expirationHours * 60 * 60 * 1000; // Expiration time in milliseconds
  const tokenData: TokenData = {
    token,
    expiresAt,
  };

  // Store the token data in chrome.storage.local
  if (typeof chrome !== "undefined" && chrome.storage) {
    // Use chrome.storage.local for Chrome Extensions
    chrome.storage.local.set({ [TOKEN_KEY]: tokenData }, () => {
      console.log("Token saved in chrome storage.");
    });
  } else if (typeof localStorage !== "undefined") {
    // Use localStorage for regular browser environments during development
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
    console.log("Token saved in localStorage.");
  }
};

// Retrieve the token from chrome.storage.local
export const getToken = (callback: (token: TokenData | null) => void): void => {
  // Get the token data from chrome.storage.local
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.get([TOKEN_KEY], (result) => {
      const tokenData = result[TOKEN_KEY];

      if (!tokenData) {
        callback(null); // No token found, return null
        return;
      }

      try {
        const { expiresAt } = tokenData as TokenData;

        if (Date.now() > expiresAt) {
          // Token is expired
          removeToken(); // Clear expired token
          callback(null); // Return null because the token is expired
          return;
        }

        callback(tokenData); // Return the valid token + expiration
      } catch (error) {
        removeToken(); // Remove invalid token data
        callback(null); // Return null if there is an error
      }
    });
  } else if (typeof localStorage !== "undefined") {
    // Use localStorage for regular browser environments during development
    const tokenDataString = localStorage.getItem(TOKEN_KEY);

    if (!tokenDataString) {
      callback(null); // No token found, return null
      return;
    }

    try {
      const tokenData = JSON.parse(tokenDataString) as TokenData;

      if (Date.now() > tokenData.expiresAt) {
        removeToken(); // Clear expired token
        callback(null); // Return null because the token is expired
        return;
      }

      callback(tokenData); // Return the valid token + expiration
    } catch (error) {
      removeToken(); // Remove invalid token data
      callback(null); // Return null if there is an error
    }
  }
};

// Remove the token from chrome.storage.local
export const removeToken = (): void => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.remove([TOKEN_KEY], () => {
      console.log("Token removed from chrome storage.");
    });
  } else if (typeof localStorage !== "undefined") {
    // Use localStorage for regular browser environments during development
    localStorage.removeItem(TOKEN_KEY);
    console.log("Token removed from localStorage.");
  }
};
