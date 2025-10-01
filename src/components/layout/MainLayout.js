import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useParams } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const { id } = useParams();

  const isSuperAdmin = localStorage.getItem("role") === "superAdmin";

  // 🔹 Define nav items once
  const navItems = [
    ...(localStorage.getItem("role") === "superAdmin"
      ? [
          {
            label: "ShowRooms",
            to: `/admin/dealer/showrooms`,
            isActive: /^\/showrooms(\/|$)/.test(path),
          },
        ]
      : []),
    {
      label: "Dashboard",
      to: isSuperAdmin ? `/admin/dealer/${id}/dashboard` : "/dashboard",
      isActive: path.includes("/dashboard"),
    },
    {
      label: "Profile",
      to: isSuperAdmin ? `/admin/dealer/${id}/profile` : "/profile",
      isActive: path.includes("/profile"),
    },
    {
      label: "ShowRoom",
      to: isSuperAdmin ? `/admin/dealer/${id}/showroom` : "/showroom",
      isActive: /^\/showroom(\/|$)/.test(path),
    },
  ];

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
        <div className="flex items-center shadow bg-primary-600 justify-between px-6 py-3 md:py-0 relative">
          

          {/* Desktop Navigation */}
          <nav className="hidden md:flex h-full">
            <div className="flex flex-row">
              {navItems.map(({ label, to, isActive }) => (
                <Link
                  key={label}
                  to={to}
                  className={`h-full w-full items-center md:px-8 px-4 py-4 text-sm font-medium hover:bg-primary-700 hover:text-white ${
                    isActive ? "bg-primary-700 text-white" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 px-4 py-1 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <div className="h-8 w-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.fullName?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-white">
                {user?.fullName}
              </span>
              <svg
                className={`h-4 w-4 text-white transition-transform duration-200 ${
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

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                <div className="px-4 py-3 border-b border-secondary-100">
                  <p className="text-sm font-medium text-secondary-900">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-secondary-500">Partner Account</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl flex ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-primary-700 shadow-md z-40 md:hidden">
              <div className="flex flex-col">
                {navItems.map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="px-4 py-3 text-white hover:bg-primary-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-left text-red-200 hover:bg-red-500 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
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
