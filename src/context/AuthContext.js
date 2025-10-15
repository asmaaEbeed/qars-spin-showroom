import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api/Auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    userName: null,
    role: null,
    email: null,
    userId: null,
    fullName: null,
    partnerId: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // In case Refresh get user data again
  useEffect(() => {
    const fetchMe = async() => {
      setLoading(true);
      const response = await authAPI.me();
      console.log(response)
      handleUserData(response);
      setLoading(false);
    }
    if (user.userId === null) {
      const token = localStorage.getItem("token");
      if (token) {
        fetchMe();
      }
    }
  }, []);

  // Mock authentication functions
  const login = async (data) => {
    setError("");
    try {
      const response = await authAPI.login(data);
      handleUserData(response);
      setLoading(false);
      const isSuperAdmin = response.data.roles.some(
        role => role.toLowerCase() === "superadmin"
      );
      if (isSuperAdmin) {
        localStorage.setItem("partnerId", null);
      } else {
        localStorage.setItem("partnerId", response.data.partnerData.partnerId);
      }
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

  const handleUserData = (response) => {
    console.log(response)
    setUser({
      userName: response.data.userName,
      email: response.data.email,
      userId: response.data.userId,
    });
    if (response.data.partnerData) {
      setUser((prev) => ({
        ...prev,
        fullName: response.data.partnerData.fullName,
        partnerId: response.data.partnerData.partnerId,
      }));
    }
    if (response.data.roles) {
      const isSuperAdmin = response.data.roles.some(
        role => role.toLowerCase() === "superadmin"
      );
      if (
        isSuperAdmin
      ) {
        console.log(response.data.partnerData);
        localStorage.setItem("role", "superAdmin");
        setUser((prev) => ({
          ...prev,
          partnerId: null,
          role: "superAdmin",
        }));
      } else {
        console.log(response.data.partnerData);
        localStorage.setItem("role", "admin");
        setUser((prev) => ({
          ...prev,
          partnerId: response.data.partnerData.partnerId,
          role: "admin",
        }));
      }
    }
  };

  const logout = () => {
    setUser({
      userName: null,
      role: null,
      email: null,
      userId: null,
      fullName: null,
      partnerId: null,
    });
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
    // const savedUser = localStorage.getItem("user");
    // if (savedUser) {
    //   setUser(JSON.parse(savedUser));
    // }
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
