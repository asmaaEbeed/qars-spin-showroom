import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { FiTruck } from "react-icons/fi";
import SelectShowroomHint from "../components/adminHint/SelectShowroomHint";
import { useParams } from "react-router-dom";

const Showroom = () => {
  const { id } = useParams();
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
    // {
    //   id: "cars-rent",
    //   title: "Cars For Rent",
    //   description: "Manage your car rental listings",
    //   color: "blue",
    //   icon: <FiTruck className="w-8 h-8 text-blue-600" />,
    //   count: stats.carsForRent,
    //   path: "#",
    // },
    // {
    //   id: "bikes-sale",
    //   title: "Bikes For Sale",
    //   description: "Manage your bike listings for sale",
    //   color: "green",
    //   icon: <FaMotorcycle className="w-8 h-8 text-green-600" />,
    //   count: stats.bikesForSale,
    //   path: "#",
    // },
  ];

  // Set the partner id in the local storage in case of super admin
  useEffect(() => {
    if (localStorage.getItem("role") === "superAdmin") {
      if (id && id !== "undefined") localStorage.setItem("partnerId", id)
    }
  }, [id]);

  // Check if the user is a super admin and if the id is undefined, then show the select showroom hint component.

  if (localStorage.getItem("role") === "superAdmin") {
    if (!id || id === "undefined") return (<SelectShowroomHint />)

  }

return (
  <MainLayout>
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Showroom Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your vehicle listings and inventory efficiently
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {showroomItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Icon circle */}
              <div className="flex items-center justify-center">
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full bg-${item.color}-100`}
                >
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h4 className="mt-6 text-lg font-semibold text-gray-800 text-center">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-gray-500 text-center">
                {item.description}
              </p>

              {/* Count */}
              <div className="mt-5 flex justify-center items-center gap-2">
                {/* <span
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${item.color}-100 text-${item.color}-600 text-lg font-bold`}
                  >
                    {item.count}
                  </span> */}
                <span className="text-gray-600 text-md">Let's see your listings</span>
              </div>

              {/* Button */}
              <div className="mt-6">
                <Link
                  to={id && id !== "undefined" ? `/admin/dealer/${id}${item.path}` : item.path}
                  className={`block text-center w-full py-2.5 rounded-lg text-white font-medium transition-all ${item.path === "#"
                      ? "bg-gray-300 cursor-not-allowed"
                      : `bg-${item.color}-600 hover:bg-${item.color}-700`
                    }`}
                >
                  Go
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
