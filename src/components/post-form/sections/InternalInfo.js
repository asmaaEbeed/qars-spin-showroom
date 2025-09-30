import React from "react";

const InternalInfo = ({ formData, setFormData, errors, handleBlur }) => {
  return (
    <div className="mt-8">
      <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
        Car Internal Info
        <span className="flex-1 border-b-2 mt-2 border-gray-400"></span>
      </h4>

      <div className="flex"></div>

      <div className="bg-gray-50 shadow-md border p-4 mb-2 rounded-lg">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) =>
                  setFormData({ ...formData, ownerName: e.target.value })
                }
                onBlur={() => handleBlur("ownerName")}
                className={`w-full px-3 py-2 border ${
                  errors.ownerName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary-500 focus:border-primary-500 pl-5`}
                placeholder="Owner Name"
                step="0.01"
                min="0"
              />
            </div>
            {errors.ownerName && (
              <p className="mt-1 text-xs text-red-600">{errors.ownerName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Mobile *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="tel"
                value={formData.ownerMobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerMobile: e.target.value,
                  })
                }
                onBlur={() => handleBlur("ownerMobile")}
                className={`w-full px-3 py-2 border ${
                  errors.ownerMobile ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary-500 focus:border-primary-500 pl-5`}
                placeholder="Owner Mobile"
              />
            </div>
            {errors.ownerMobile && (
              <p className="mt-1 text-xs text-red-600">{errors.ownerMobile}</p>
            )}
          </div>
        </div>
        {/* Car Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Chassis Number */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chassis Number *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={formData.chassisNumber}
                onChange={(e) =>
                  setFormData({ ...formData, chassisNumber: e.target.value })
                }
                onBlur={() => handleBlur("chassisNumber")}
                className={`w-full px-3 py-2 border ${
                  errors.chassisNumber ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary-500 focus:border-primary-500 pr-9`}
                placeholder="0"
                min="0"
              />
            </div>
            {errors.chassisNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.chassisNumber}
              </p>
            )}
          </div>

          {/* Plate Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plate Number *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={formData.plateNumber}
                onChange={(e) =>
                  setFormData({ ...formData, plateNumber: e.target.value })
                }
                onBlur={() => handleBlur("plateNumber")}
                className={`w-full px-3 py-2 border ${
                  errors.plateNumber ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary-500 focus:border-primary-500 pr-9`}
                placeholder="0"
                min="0"
              />
            </div>
            {errors.plateNumber && (
              <p className="mt-1 text-xs text-red-600">{errors.plateNumber}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interanl Remarks:
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              value={formData.internalRemarks}
              onChange={(e) =>
                setFormData({ ...formData, internalRemarks: e.target.value })
              }
              onBlur={() => handleBlur("internalRemarks")}
              className={`w-full px-3 py-2 border ${
                errors.internalRemarks ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-primary-500 focus:border-primary-500 pl-5`}
              placeholder="Internal Remarks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalInfo;
