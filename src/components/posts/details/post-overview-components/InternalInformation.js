
// Reviewd
import React from "react";

const InternalInformation = ({ currentPost }) => {
  return (
    <div className="space-y-6">
      {/* <h3 className="text-lg font-semibold text-secondary-800 pb-2 border-b border-secondary-200">
        Internal Information
      </h3> */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-secondary-700 mb-3">
            Owner Info
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-600">Owner Name:</span>
              <span className="font-medium text-secondary-800">
                {currentPost.ownerName || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Owner Mobile:</span>
              <span className="font-medium text-secondary-800">
                {currentPost.ownerMobile || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-secondary-700 mb-3">
            Internal Car Info
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-600">Plate Number:</span>
              <span className="font-medium text-secondary-800">
                {currentPost.plateNumber || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Chassis Number:</span>
              <span className="font-medium text-secondary-800">
                {currentPost.chassisNumber || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-secondary-700 mb-3">
            Remarks
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-secondary-800">
                {currentPost.internalRemarks || "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-secondary-700 mb-3">
            Manufacture Year
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-secondary-800">
                {currentPost.manufactureYear || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalInformation;
