// src/api/auth.js
import { baseUrl } from "./api.ts";

export const login = async ({ username, password }: { username: string; password: string }):Promise<string> => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "Login failed");
    }

    const data = await response.json();
    // Return the token if the login is successful
    return data.token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
