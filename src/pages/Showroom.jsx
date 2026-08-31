import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { FiTruck } from "react-icons/fi";
import SelectShowroomHint from "../components/adminHint/SelectShowroomHint";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Showroom = () => {
  const { id } = useParams();
  const { user } = useAuth()
  const [stats, setStats] = useState({
    carsForSale: 0,
    carsForRent: 0,
    bikesForSale: 0,
    caravansForSale: 0,
    caravansForRent: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const mockStats = {
        carsForSale: 42,
        carsForRent: 18,
        bikesForSale: 7,
        caravansForSale: 5,
        caravansForRent: 3,
      };
      setStats(mockStats);
    };

    fetchStats();
  }, []);

  const showroomItems = [
    {
      id: "cars-sale",
      title: "Cars For Sale",
      description: "Manage your car listings for sale",
      color: "primary",
      icon: <FiTruck className="w-8 h-8 text-primary-600" />,
      count: stats.carsForSale,
      path: "/showroom/posts",
    },
  ];

  // Set the partner id in the local storage in case of super admin
  // useEffect(() => {
  //   if (localStorage.getItem("role") === "superAdmin") {
  //     if (id && id !== "undefined") localStorage.setItem("partnerId", id)
  //   }
  // }, [id]);

  // Check if the user is a super admin and if the id is undefined, then show the select showroom hint component.

  if (user.role === "superAdmin") {
    if (!id || id === "undefined") return (<SelectShowroomHint />)

  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">

            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-secondary-800 to-primary-700 bg-clip-text text-transparent">Showroom Dashboard</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your vehicle listings and inventory efficiently
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showroomItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-br from-primary-50 via-white to-indigo-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="p-7 flex flex-col h-full">
                {/* Icon circle with subtle glow effect */}
                <div className="flex items-center justify-center">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 shadow-inner`}>
                    <div className={`text-2xl text-${item.color}-600`}>
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Title with subtle underline effect */}
                <h4 className="mt-6 text-xl font-bold text-gray-900 text-center relative pb-2">
                  {item.title}
                  <span className={`absolute bottom-0 left-1/2 w-12 h-0.5 bg-${item.color}-400 transform -translate-x-1/2`}></span>
                </h4>

                {/* Description with better spacing */}
                <p className="mt-4 text-sm text-gray-600 text-center leading-relaxed">
                  {item.description}
                </p>

                {/* Count with animated arrow */}
                {/* <div className="mt-6 flex justify-center items-center gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <svg
                    className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div> */}

                {/* Button with gradient and hover effect */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    to={id && id !== "undefined" ? `/admin/dealer/${id}${item.path}` : item.path}
                    className={`block text-center w-full py-3 rounded-xl font-medium transition-all ${item.path === "#"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 hover:from-${item.color}-600 hover:to-${item.color}-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5`
                      }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Showroom;
