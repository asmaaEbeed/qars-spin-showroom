import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useParams } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Footer from "../common/Footer";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const { id } = useParams();

  const isSuperAdmin = user.role === "superAdmin";

  // 🔹 Define nav items once
  const navItems = [
    ...(isSuperAdmin
      ? [
          // {
          //   label: "ShowRooms",
          //   to: `/admin/showrooms`,
          //   isActive: /^\/admin\/showrooms(\/|$)/.test(path),
          // },
          {
            label: "SuperAdmin Panel",
            to: `/admin/superAdmin-panel`,
            isActive: /^\/admin\/superAdmin-panel(\/|$)/.test(path),
          },
          {
            label: "Banners",
            to: "#", // parent has no direct link
            isActive:
              path.includes("/big-banners") ||
              path.includes("/small-banners") ||
              path.includes("/big-fillers") ||
              path.includes("/small-fillers"),

            // Submenu Children
            children: [
              {
                label: "Big Banners",
                to: `/admin/big-banners`,
                isActive: path.includes("/big-banners"),
              },
              {
                label: "Small Banners",
                to: `/admin/small-banners`,
                isActive: path.includes("/small-banners"),
              },
              {
                label: "Big Fillers",
                to: `/admin/big-fillers`,
                isActive: path.includes("/big-fillers"),
              },
              {
                label: "Small Fillers",
                to: `/admin/small-fillers`,
                isActive: path.includes("/small-fillers"),
              },
            ],
          },
          {
            label: "Requests",
            to: `/admin/requests`,
            isActive: /^\/admin\/requests(\/|$)/.test(path),
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
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {/* Parent Link */}
                  <Link
                    to={item.to}
                    className={`h-full flex w-auto uppercase md:px-2 lg:px-4 text-center py-4 text-sm font-medium hover:bg-primary-700 whitespace-nowrap transition-all duration-200 tracking-widest ${
                      item.isActive ? "bg-primary-700 text-white" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.children && <IoMdArrowDropdown className="w-4 h-4" />}
                  </Link>

                  {/* ✅ Submenu (if children exist) */}
                  {item.children && (
                    <div className="absolute  left-0 top-full hidden group-hover:block transform origin-top transition-all duration-200 ease-out scale-y-0 group-hover:scale-y-100">
                      <div className="mt-2 py-1.5 bg-white rounded-lg shadow-xl border border-gray-100 min-w-56">
                        {item.children.map((child, index) => (
                          <div
                            key={child.label}
                            className="px-1.5 py-0.5 transition-colors duration-150 ease-in-out hover:bg-primary-50 first:rounded-t-md last:rounded-b-md"
                          >
                            <Link
                              to={child.to}
                              className={`
              relative flex items-center px-4 py-2.5 text-sm font-medium
              transition-all duration-200 ease-out
              ${
                child.isActive
                  ? "text-primary-600 bg-primary-50 border-r-4 border-primary-500"
                  : "text-gray-700 hover:text-primary-600 hover:pl-5"
              }`}
                            >
                              {child.icon && (
                                <span className="mr-3 text-lg text-primary-500">
                                  {child.icon}
                                </span>
                              )}
                              {child.label}
                              {!child.isActive && (
                                <span className="absolute left-0 w-1 h-0 bg-primary-500 transition-all duration-200 rounded-r opacity-0 group-hover:opacity-100" />
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                <div className="px-3 py-4 bg-primary-50 border-b border-color-white">
                  <p className="text-sm font-medium text-secondary-900">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {user.role === "superAdmin" ? "Qars Spin" : "Partner"}{" "}
                    Account
                  </p>
                </div>
                {!isSuperAdmin && (
                  <div className="px-4 py-3 border-b border-secondary-50 text-secondary-500 hover:bg-gray-50">
                    <Link to="/user-requests">My Requests</Link>
                  </div>
                )}
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
          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 top-24 z-40 md:hidden bg-black/30 backdrop-blur-sm">
              <div
                className="bg-white shadow-xl rounded-b-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="divide-y divide-gray-100">
                  {navItems.map((item) => (
                    <div key={item.label} className="relative group">
                      {item.children ? (
                        <div className="border-b border-gray-100 last:border-b-0">
                          <div
                            className="flex items-center justify-between px-5 py-3.5 text-gray-800 font-medium"
                            onClick={() => setMobileSubMenu(!mobileSubMenu)}
                          >
                            <span>{item.label}</span>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500 transition-transform duration-200 group-has-[.submenu-open]:rotate-180" />
                          </div>
                          <div
                            className={
                              mobileSubMenu
                                ? "submenu bg-gray-50"
                                : "hidden submenu bg-gray-50"
                            }
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                        block px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-100
                        border-l-4 border-transparent
                        ${
                          child.isActive
                            ? "border-primary-500 bg-primary-50 text-primary-600"
                            : ""
                        }
                        transition-colors duration-200
                      `}
                              >
                                <div className="flex items-center">
                                  {child.icon && (
                                    <span className="mr-3 text-primary-500">
                                      {child.icon}
                                    </span>
                                  )}
                                  {child.label}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                  block px-5 py-3.5 text-gray-800 font-medium
                  border-l-4 border-transparent
                  hover:bg-gray-50
                  ${
                    item.isActive
                      ? "border-primary-500 bg-primary-50 text-primary-600"
                      : ""
                  }
                  transition-colors duration-200
                `}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3.5 text-left text-red-600 font-medium hover:bg-red-50 transition-colors duration-200 flex items-center"
                >
                  <FiLogOut className="mr-2" />
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
      <Footer />
      {/* Click Outside Handler */}
      {(userMenuOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setUserMenuOpen(false);
            setMobileMenuOpen(false);
            setMobileSubMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;
