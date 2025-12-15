import { useAuth } from "@/contexts/AuthContext";
import Unauthorized from "@/pages/Unauthorized";

const ProtectedRoute = (props) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === false) {
    return <Unauthorized />;
  }
  return <>{props.children}</>;
};
export default ProtectedRoute;
