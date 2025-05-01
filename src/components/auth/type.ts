export interface AuthContextType {
    isLoggedIn: boolean;
    onLogin: (token:string | null) => void;
    logout: () => void;
    logInError: boolean; 
    setLogInError: React.Dispatch<React.SetStateAction<boolean>>; 
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; 
    setCurrentToken: React.Dispatch<React.SetStateAction<string | null>>
    token:string | null
  }