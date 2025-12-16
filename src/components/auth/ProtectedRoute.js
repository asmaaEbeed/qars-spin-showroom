import { useAuth } from "../../context/AuthContext";
import NotAuthorized from "../../pages/NotAuthorized";
import { Navigate } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.svg";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { loading, user } = useAuth();

  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }

  if ((loading || user === undefined || user.role === null) && localStorage.getItem("token") !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-500/10 to-indigo-500/10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <img className="h-8 w-auto" src={Logo} alt="Qars Spin Logo" />
      </div>
    );
  }

  if (!user.role && localStorage.getItem("token") === null) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <NotAuthorized />;
  }


  // if (allowedRoles && !allowedRoles.includes(user.role) && !loading) {
  //   return <NotAuthorized />;
  // }

  return children;
}
