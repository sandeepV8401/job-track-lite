 
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/store/authHook";
import { ROUTES } from "../../config/routes.constants";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

   
  return isAuthenticated ? (
    <Navigate to={ROUTES.DASHBOARD} replace />
  ) : (
    children
  );
};

export default PublicRoute;
