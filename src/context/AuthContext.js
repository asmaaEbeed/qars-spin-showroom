import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api/Auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user === null) {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(false);
        authAPI.me().then((response) => {
          setUser({
            username: response.data.userName,
            fullName: localStorage.getItem("fullName"),
            role: response.data.roles,
            email: response.data.email,
            userId: response.data.userId,
          });
        });
      }
    }
  }, [user]);

  // Mock authentication functions
  const login = async (data) => {
    setError("");
    try {
      const response = await authAPI.login(data);
      setUser({
        username: response.data.userName,
        fullName: response.data.partnerData.fullName,
        role: response.data.roles,
        email: response.data.email,
        userId: response.data.userId,
      });
      setLoading(false);
      response.data.role !== "superAdmin" && localStorage.setItem("partnerId", response.data.partnerData.partnerId);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.userName);
      localStorage.setItem("fullName", response.data.partnerData.fullName);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
      setError(error.response.data.message);
      return error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("partnerId");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("fullName");
    localStorage.removeItem("user");
    localStorage.removeItem("authUser");
    localStorage.removeItem("role");
    // window.location.href = "/login";
  };

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
