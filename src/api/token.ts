const TOKEN_KEY = "jwt";
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);  // Could return string or null
};
