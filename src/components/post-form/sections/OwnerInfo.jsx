import React from "react";

const OwnerInfo = ({ formData, setFormData, errors, handleBlur }) => {
  return (
    <div className="mt-8">
      <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
        Owner Info
        <span className="flex-1 border-b-2 mt-2 border-gray-400"></span>
      </h4>

      <div className="flex"></div>

      <div className="bg-gray-50 shadow-md border p-4 mb-2 rounded-lg">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name
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
              Owner Mobile
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                value={formData.ownerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, ownerEmail: e.target.value })
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
            {errors.ownerEmail && (
              <p className="mt-1 text-xs text-red-600">{errors.ownerEmail}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerInfo;
