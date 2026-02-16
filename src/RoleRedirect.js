import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function RoleRedirect() {
  const { user } = useAuth();

  if (!user.userId) return null; // or loader

  return (
    <Navigate
      to={user.role === "superAdmin" ? "/admin/superAdmin-panel" : "/dashboard"}
      replace
    />
  );
}

export default RoleRedirect;
