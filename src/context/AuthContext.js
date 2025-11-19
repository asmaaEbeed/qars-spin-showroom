import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api/Auth.api";
import { toast } from "react-toastify";

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
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await authAPI.me();
        handleUserData(response);
      } catch (error) {
        console.log(error);
        toast.error("Network error. Please check your connection.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    if (user.userId === null) {
      const token = localStorage.getItem("token");
      if (token) {
        fetchMe();
      }
    }
  }, [user.userId]);

  // Mock authentication functions
  const login = async (data) => {
    setError("");
    try {
      const response = await authAPI.login(data);
      handleUserData(response);
      setLoading(false);
      // const isSuperAdmin = response.data.roles.some(
      //   role => role.toLowerCase() === "superadmin"
      // );
      // if (isSuperAdmin) {
      //   localStorage.setItem("partnerId", null);
      // } else {
      //   localStorage.setItem("partnerId", response.data.partnerData.partnerId);
      // }
      // localStorage.setItem("userId", response.data.userId);
      // localStorage.setItem("userName", response.data.userName);
      // localStorage.setItem("fullName", response.data.partnerData.fullName);
      localStorage.setItem("token", response.data.token);

    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
      setError(error.response.data.message);
      return error;
    }
  };

  const handleUserData = (response) => {
    const data = response.data;
    const isSuperAdmin = data.roles?.some(role => role.toLowerCase() === "superadmin");
    setUser({
      userName: response.data.userName,
      email: response.data.email,
      userId: response.data.userId,
      fullName: data.partnerData?.fullName || null,
      partnerId: isSuperAdmin ? null : data.partnerData?.partnerId || null,
      role: isSuperAdmin ? "superAdmin" : "admin",
    });

    
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
