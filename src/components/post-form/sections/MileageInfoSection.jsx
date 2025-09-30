import React from 'react'

const MileageInfoSection = ({ formData, setFormData, errors, handleBlur }) => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 shadow-md border p-4 my-4 rounded-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mileage *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type="number"
                            value={formData.mileage}
                            onChange={(e) =>
                                setFormData({ ...formData, mileage: e.target.value })
                            }
                            onBlur={() => handleBlur("mileage")}
                            className={`w-full px-3 py-2 border ${errors.mileage ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:ring-primary-500 focus:border-primary-500 pr-9`}
                            placeholder="0"
                            min="0"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">km</span>
                        </div>
                    </div>
                    {errors.mileage && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.mileage}
                        </p>
                    )}
                </div>

                
                {/* Warranty */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Warranty *
                    </label>
                    <select
                        value={formData.warrantyIsAvailable}
                        onChange={(e) =>
                            setFormData({ ...formData, warrantyIsAvailable: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        required
                    >
                        <option value="">Select Warranty</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    {errors.warrantyIsAvailable && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.warrantyIsAvailable}
                        </p>
                    )}
                </div>
            </div></div>
    )
}

export default MileageInfoSection