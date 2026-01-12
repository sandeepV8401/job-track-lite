 
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../config/routes.constants";
import { useAuth } from "../../features/auth/store/authHook";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
   
  return isAuthenticated ? children : <Navigate to={ROUTES.AUTH} replace />;
};

export default ProtectedRoute;
 