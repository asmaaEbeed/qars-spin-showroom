import React from 'react'

const PriceSection = ({ formData, setFormData, errors, handleBlur }) => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 shadow-md border p-4 my-4 rounded-lg">
                <div >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Asking Price *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-10 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">QAR</span>
                        </div>
                        <input
                            type="number"
                            value={formData.askingPrice}
                            onChange={(e) =>
                                setFormData({ ...formData, askingPrice: e.target.value })
                            }
                            onBlur={() => handleBlur("askingPrice")}
                            className={`w-full px-3 py-2 border ${errors.askingPrice ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:ring-primary-500 focus:border-primary-500 pl-4 `}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    {errors.askingPrice && (
                        <p className="mt-1 text-xs text-red-600">{errors.askingPrice}</p>
                    )}
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Price *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-10 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">QAR</span>
                        </div>
                        <input
                            type="number"
                            value={formData.minimumPrice}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    minimumPrice: e.target.value,
                                })
                            }
                            onBlur={() => handleBlur("minimumPrice")}
                            className={`w-full px-3 py-2 border ${errors.minimumPrice
                                ? "border-red-500"
                                : "border-gray-300"
                                } rounded-md focus:ring-primary-500 focus:border-primary-500 pl-5`}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    {errors.minimumPrice && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.minimumPrice}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PriceSection