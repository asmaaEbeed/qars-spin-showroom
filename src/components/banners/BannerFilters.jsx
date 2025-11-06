import { FunnelIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { MdDateRange } from "react-icons/md";
import { TARGET_TYPE } from "./constants/bannersConstant";
import { useBannerContext } from "../../context/BannerContext";
import { IoReload } from "react-icons/io5";

export default function BannerFilters() {

  const { filter, setFilter, resetFilter } = useBannerContext();


  return (
    <>
      <div className="mb-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md ">
        <h5 className="text-sm font-semibold text-gray-700 flex items-center gap-2 border-b border-secondary-100 px-5 py-4">
          <FunnelIcon className="w-6 h-6  text-primary-500" />
          Filter Banners
        </h5>

        <div className="space-y-4 p-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              By Target
            </label>
            <select
              value={filter.targetType}
              onChange={(e) => setFilter({ ...filter, targetType: e.target.value })}
              className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Show All</option>
              {TARGET_TYPE.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              By Status
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Show All</option>
              <option value="Draft">Draft</option>
              <option value="Approved">Approved</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>


      <div className="mb-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-4 border-b border-secondary-100 px-5 py-4">
          <h5 className="text-sm font-semibold text-gray-700 flex items-center gap-2">

            <MdDateRange className="w-5 h-5  text-primary-500" />
            Choose Dates
          </h5>

        </div>

        <div className="space-y-4 px-5 py-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
              className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
              className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

      </div>
      <button
        onClick={resetFilter}
        className="w-full inline-flex items-center justify-center px-2 py-2 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
      >
        <IoReload className="w-5 h-5 mx-2" />
        Reset Filter
      </button>

    </>
  );
}
