import React from "react";
import { useAuth } from "../../context/AuthContext";
import NotAuthorized from "../../pages/NotAuthorized";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { loading } = useAuth();

  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  const role = localStorage.getItem("role"); // or from context if you prefer

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <NotAuthorized />;
  }

  return children;
}
