const TOKEN_KEY = "jwt";

interface TokenData {
  token: string;
  expiresAt: number;
}

export function formatBearerToken(token: string | null): string {
  if (token === null){
    return token = '';
  }
  return `Bearer ${token}`;
}

export const setToken = (token: string, expirationHours: number = 24): void => {
  const expiresAt = Date.now() + (expirationHours * 60 * 60 * 1000);
  const tokenData: TokenData = {
    token,
    expiresAt
  }
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
};

export const getToken = (): string | null => {
  const tokenData = localStorage.getItem(TOKEN_KEY);
  if (!tokenData) return null;

  try {
    const { token, expiresAt } = JSON.parse(tokenData) as TokenData;

    if (Date.now() > expiresAt) {
      localStorage.removeItem(TOKEN_KEY); //clear expired token
      return null;
    }
    return token;
  }
  catch(error) {
    localStorage.removeItem(TOKEN_KEY);
    return null
  }
};

export const isTokenValid = (): boolean => {
  const tokenData = localStorage.getItem(TOKEN_KEY);
  if (!tokenData) {
    return false;
  }
 
  try {
    const token = JSON.parse(tokenData);
    return token.expiresAt > Date.now();
  }
  catch(error) {
    return false;
  }
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
}
