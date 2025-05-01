import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth"

interface ProtectedRouteProps {
    children: React.ReactNode;
  }

 const ProtectedRoute: React.FC<ProtectedRouteProps> =({ children }) =>{
const {isLoggedIn}=useAuth();
  if (!isLoggedIn ) {
    return <Navigate to="/login" />;
  }
  return children;
}
export default ProtectedRoute