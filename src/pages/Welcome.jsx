import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo/Logo.svg";
import { FaPlus, FaUsers, FaWallet } from "react-icons/fa";
import { FaChartColumn } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";

const Welcome = () => {
  return (
    <div style={{
        backgroundImage: 'url("/images/auth-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="min-h-screen py-4">
  

      <div className="relative h-full flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
        <div className="max-w-4xl w-full">
          {/* Main Card */}
          <div className="bg-white/35 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 overflow-hidden duration-500">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#554419] to-primary-600 px-4 sm:px-8 py-6 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                    backgroundSize: "30px 30px",
                  }}
                ></div>
              </div>

              <div className="relative space-y-4">
                {/* Logo */}
                <div className="bg bg-opacity-40 text-shadow-lg rounded-full ">
                  <img
                    src={Logo}
                    alt="Qars Spin Logo"
                    className="w-1/2 m-auto block"
                  />
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-8 h-0.5 bg-white/60 rounded-full"></div>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90">
                    Partners Portal
                  </h2>
                </div>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                  Join our exclusive network of automotive partners and showcase
                  your premium vehicles to thousands of potential buyers
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 sm:px-12 py-12">
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center group shadow-md bg-white/20 p-4 rounded-2xl">
                  <div className="h-14 w-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <FaWallet className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                    Showcase Vehicles
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    Professional car listings with detailed specs
                  </p>
                </div>

                <div className="text-center group shadow-md bg-white/20 p-4 rounded-2xl">
                  <div className="h-14 w-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <FaChartColumn className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                    Track Analytics
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    Monitor performance and engagement
                  </p>
                </div>

                <div className="text-center group shadow-md bg-white/20 p-4 rounded-2xl">
                  <div className="h-14 w-14 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <FaUsers className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                    Build Network
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    Connect with verified customers
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/login"
                  className="group relative w-full sm:w-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105">
                  <FiLogIn className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />

                    Sign In to Portal
                  </div>
                </Link>

                <Link
                  to="/apply"
                  className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-secondary-700 bg-white/80 border-2 border-secondary-200 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-md transform hover:-translate-y-1 group-hover:scale-105"
                >
                  <FaPlus className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                  Apply as Partner
                </Link>
              </div>

              <p className="absolute text-white bottom-2 left-1/2 transform -translate-x-1/2 text-xs  px-4 py-2 rounded-full">
                © 2024 Qars Spin Partners Portal
              </p>
            </div>
          </div>

          {/* Floating Footer */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
