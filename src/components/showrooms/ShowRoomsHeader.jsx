import { useState } from "react";
import { FaBuilding, FaCarSide, FaPlus, FaStar } from "react-icons/fa";

export const ShowRoomsHeader = ({ showrooms }) => {

  // === Statistics Calculation ===
  const totalShowrooms = showrooms.length;
  const totalActivePosts = showrooms.reduce((sum, s) => sum + s.postsCount, 0);

  return <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 top-16 z-40">
    <div className="max-w-7xl mx-auto  py-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Title Section */}
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaCarSide className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-secondary-800 to-primary-700 bg-clip-text text-transparent">
              Showrooms Management
            </h1>
            <p className="text-secondary-600 text-sm lg:text-base mt-1">
              Manage your showrooms and track their performance
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex sm:flex-row gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 my-6">
            {/* Total Showrooms */}
            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2">
              <FaBuilding className="text-primary-500 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Total Showrooms</p>
                <h2 className="text-sm md:text-lg lg:text-2xl font-bold">{totalShowrooms}</h2>
              </div>
            </div>

            {/* Active Posts */}
            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2">
              <FaCarSide className="text-green-500 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Active Posts</p>
                <h2 className="text-sm md:text-lg lg:text-2xl font-bold">{totalActivePosts}</h2>
              </div>
            </div>
            
            {/* <button
              onClick={() => {
                setShowModal(true);

              }}
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-2xl shadow p-3 flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              <p className="text-xs md:text-sm lg:text-md font-semibold">Add New ShowRoom</p>
            </button> */}
          </div>

        </div>

      </div>
    </div>
  </div>
}