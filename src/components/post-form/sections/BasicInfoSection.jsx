import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import { usePosts } from '../../../context/PostsContext';



const BasicInfoSection = ({ formData, setFormData, errors, handleBlur }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [listOfCarCat, setListOfCarCat] = useState([])

    const {
        carsNameList,
        carsNameListLoading,
        } = usePosts();


    useEffect(() => {
        // Fetch Cars combined model name for set cars name list
        

        const fetchCarCategory = async () => {
            try {
                setIsLoading(true);
                fetch("https://qarsspintest.smartvillageqatar.com/QarsSpinAPI/BrowsingRelatedApi.asmx/GetListOfCarCategories")
                    .then((res) => res.json())
                    .then((data) => {
                        setIsLoading(false);
                        setListOfCarCat(data.Data);
                    })
                    .catch((err) => console.error(err));
            } catch (e) {
                toast.error("Failed to fetch car categories");
            }
        };
        fetchCarCategory();
    }, []);

    return (
        <div>
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                Basic Info
                <span className="flex-1 border-b-2 mt-2 border-gray-400"></span>
            </h4>
            <div className='bg-gray-50 shadow-md border p-4 mb-2 rounded-lg'>
                {/* Car Name */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Car Name *
                        </label>
                        
                        {carsNameListLoading ? <p className='border p-2'>Loading...</p> :<Select
                            options={carsNameList}
                            getOptionLabel={(option) => option.text}
                            getOptionValue={(option) => String(option.value)}
                            value={
                                carsNameList.find((c) => c.text === formData.carNamePl) || null
                            }
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    carNamePl: selected ? selected.text  : "",
                                })
                            }
                            placeholder="Select Car Name"
                            isClearable
                            className='w-auto'
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: errors.carNamePl
                                        ? "red"
                                        : state.isFocused
                                            ? "#3b82f6" // tailwind primary-500 تقريباً
                                            : "#d1d5db", // gray-300
                                    boxShadow: state.isFocused
                                        ? "0 0 0 1px #3b82f6"
                                        : "none",
                                    "&:hover": {
                                        borderColor: state.isFocused
                                            ? "#3b82f6"
                                            : errors.carNamePl
                                                ? "red"
                                                : "#9ca3af", // gray-400
                                    },
                                }),
                            }}
                        />}

                        {errors.carNamePl && (
                            <p className="mt-1 text-xs text-red-600">{errors.carNamePl}</p>
                        )}
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Category *
                        </label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) =>
                                setFormData({ ...formData, categoryId: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            required
                        >
                            <option value="">Select Category</option>
                            {isLoading ? (
                                <option value="">Loading...</option>
                            ) : (
                                listOfCarCat.length > 0 && listOfCarCat.map((category) => (
                                    <option key={category.Category_ID} value={category.Category_ID}>
                                        {category.Category_Name_PL}
                                    </option>
                                ))
                            )}
                        </select>
                        {errors.categoryId && (
                            <p className="mt-1 text-xs text-red-600">{errors.categoryId}</p>
                        )}
                    </div>
                    {/* Year */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Year
                        </label>
                        <input
                            type="number"
                            value={formData.manufactureYear}
                            onChange={(e) =>
                                setFormData({ ...formData, manufactureYear: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                        {errors.manufactureYear && (
                            <p className="mt-1 text-xs text-red-600">{errors.manufactureYear}</p>
                        )}
                    </div>



                </div>
            </div>
        </div>
    )
}

export default BasicInfoSection