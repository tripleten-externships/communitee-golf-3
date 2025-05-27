import { useContext } from 'react'; 
import { AuthContext } from '../components/auth/AuthContext';
import { AuthContextType } from '../components/auth/type';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};