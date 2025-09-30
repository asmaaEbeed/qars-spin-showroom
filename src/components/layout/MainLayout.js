import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useParams } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.svg";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const { id } = useParams();

  const isSuperAdmin = localStorage.getItem("role") === "superAdmin";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white h-24  text-white">
        {/* Logo */}
        <div className="px-6 py-2">
          <Link
            to={isSuperAdmin ? `/admin/dealer/${id}/dashboard` : "/dashboard"}
            className="flex items-center focus-visible:border-none focus-visible:outline-none"
          >
            <img className="h-8 w-auto" src={Logo} alt="Qars Spin Logo" />
          </Link>
        </div>
        <div className="flex items-center  shadow bg-primary-600 justify-between  px-6">
          {/* Horizontal Navigation */}
          <nav className="h-full">
            <div className="flex flex-row">
              {localStorage.getItem("role") === "superAdmin" && (
                <Link
                  to="/showrooms"
                  className={`h-full w-full items-center md:px-8 px-4 py-4  text-sm font-medium hover:bg-primary-700 hover:text-white ${
                    /^\/showrooms(\/|$)/.test(path)
                      ? "bg-primary-700 text-white"
                      : ""
                  }`}
                >
                  ShowRooms
                </Link>
              )}
              <Link
                to={
                  isSuperAdmin ? `/admin/dealer/${id}/dashboard` : "/dashboard"
                }
                className={`h-full w-full items-center md:px-8 px-4 py-4 text-sm font-medium hover:bg-primary-700 hover:text-white ${
                  path.includes("/dashboard") ? "bg-primary-700 text-white" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                to={isSuperAdmin ? `/admin/dealer/${id}/profile` : "/profile"}
                className={`h-full w-full items-center md:px-8 px-4 py-4 text-sm font-medium hover:bg-primary-700 hover:text-white ${
                  path.includes("/profile") ? "bg-primary-700 text-white" : ""
                }`}
              >
                Profile
              </Link>
              <Link
                to={isSuperAdmin ? `/admin/dealer/${id}/showroom` : "/showroom"}
                className={`h-full w-full items-center md:px-8 px-4 py-4  text-sm font-medium hover:bg-primary-700 hover:text-white ${
                  /^\/showroom(\/|$)/.test(path)
                    ? "bg-primary-700 text-white"
                    : ""
                }`}
              >
                ShowRoom
              </Link>
            </div>
          </nav>

          {/* User Menu */}
          <div className="flex items-center">
            {/* User Menu */}
            <div className="hidden md:flex items-center relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 px-4 py-1 rounded-xl  hover:shadow-md transition-all duration-200 focus:outline-none "
              >
                <div className="h-8 w-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.fullName?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-secondary-800">
                  {user?.fullName}
                </span>
                <svg
                  className={`h-4 w-4 text-secondary-600 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                  <div className="px-4 py-3 border-b border-secondary-100">
                    <p className="text-sm font-medium text-secondary-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-secondary-500">
                      Partner Account
                    </p>
                  </div>
                  {/* <Link
                    to="/user-settings"
                    className="flex items-center px-4 py-3 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors duration-200"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg
                      className="h-4 w-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Your Profile
                  </Link> */}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <svg
                      className="h-4 w-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content Wrapper */}
      <div className="flex-1">
        <main className="pt-24">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-white">
              © {new Date().getFullYear()} Qars Spin. All rights reserved.
            </div>
            <div className="text-sm text-gray-500">
              Developed by{" "}
              <a
                href="https://smartvillage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Smart Village
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Click Outside Handler */}
      {(userMenuOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setUserMenuOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;
