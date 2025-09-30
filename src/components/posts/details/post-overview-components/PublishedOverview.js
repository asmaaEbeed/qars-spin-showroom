// Reviewd

import React from "react";

const PublishedOverview = ({ currentPost }) => {
  return (
    <div className="space-y-6">
      {/* <h3 className="text-lg font-semibold text-secondary-800 pb-2 border-b border-secondary-200">
        Published Information
      </h3> */}

      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-4">
          <div className="md:col-span-4 col-span-6">
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">
                Technical Description (English)
              </h4>
              <p className="text-secondary-600 text-sm">
                {currentPost?.technicalDescriptionPl}
              </p>
            </div>
            <div dir="rtl" className="bg-gray-100 rounded-lg p-4 mb-2">
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">
                الوصف الفني (عربي)
              </h4>
              <p className="text-secondary-600 text-sm">
                {currentPost?.technicalDescriptionSl}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 col-span-6">
            {/* Pricing Section */}
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">
                Pricing Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Asking Price:</span>
                  <span className="font-semibold text-primary-600">
                    QAR {currentPost?.askingPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Minimum Price:</span>
                  <span className="font-semibold text-secondary-800">
                    QAR {currentPost?.minimumPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Details Section */}
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">
                Vehicle Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Mileage:</span>
                  <span className="font-medium text-secondary-800">
                    {currentPost?.mileage} km
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Warranty:</span>
                  <span
                    className={`font-medium ${
                      currentPost?.warrantyIsAvailable
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {currentPost?.warrantyIsAvailable
                      ? "Available"
                      : "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Colors Section */}
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">
                Colors
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Interior:</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-5 h-5 rounded-full border border-secondary-300"
                      style={{
                        backgroundColor: currentPost?.colorInterior,
                      }}
                    ></div>
                    <span className="font-medium text-secondary-800 capitalize">
                      {currentPost?.interiorColorNamePl || "Not specified"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Exterior:</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-5 h-5 rounded-full border border-secondary-300"
                      style={{
                        backgroundColor: currentPost?.colorExterior,
                      }}
                    ></div>
                    <span className="font-medium text-secondary-800 capitalize">
                      {currentPost?.exteriorColorNamePl || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishedOverview;
