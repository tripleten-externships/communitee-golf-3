import { baseUrl } from "./baseUrl.ts";

interface resetPasswordProps {
  username: string;
}

export async function resetPassword({
  username,
}: resetPasswordProps): Promise<any> {
  if (!username) {
    return { error: "Username is required" };
  }

  try {
    const response = await fetch(`${baseUrl}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.success;
    } else {
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error(errorData.error || "1Username is required.");
      }

      if (response.status === 401) {
        throw new Error(errorData.error || "Invalid credentials.");
      }
      if (response.status === 404) {
        throw new Error(errorData.error || "Not Found.");
      }
      throw new Error(errorData.error || "Login failed.");
    }
  } catch (error: any) {
    console.error;
    throw new Error(error || "Login failed.");
  }
}
