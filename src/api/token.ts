const TOKEN_KEY = "jwt";

export const setToken = (token:string) => localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
