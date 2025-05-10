export interface AuthContextType {
  isLoggedIn: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  onLogin: (token: string | null) => void;
  logout: () => void;
  logInError: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLogInError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentToken: React.Dispatch<React.SetStateAction<TokenData | null>>;
  token: TokenData | null;
  logInErrorMessage: string | null;
  setLogInErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  handleForgotPassword: () => void;
  handleLogoClick: () => void;
}
export interface TokenData {
  token: string;
  expiresAt?: number;
}
