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
    

    if (!response.ok) {
      const errorData = await response.json();

   
      if (response.status === 400) {
        throw new Error(errorData.messsage || "Username and password are required.");
      }

      if (response.status === 401) {
        throw new Error(errorData.message || "Invalid credentials.");
    
      }

      throw new Error(errorData.message || "Login failed.");
      
    }
    const data = await response.json();
    return data.token;
  } catch (error:any) {
    console.log(error);
    throw new Error(error.message || "Login failed.");
  }
};
