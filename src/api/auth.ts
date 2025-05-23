import { baseUrl } from "./baseUrl.ts";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    } else {
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error(
          errorData.error || "Username and password are required."
        );
      }

      if (response.status === 401) {
        throw new Error(errorData.error || "Invalid credentials.");
      }

      throw new Error(errorData.error || "Login failed.");
    }
  } catch (error: any) {
    console.error;
    throw new Error(error.message || "Login failed.");
  }
};
