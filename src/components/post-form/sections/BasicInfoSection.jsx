import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import { usePosts } from '../../../context/PostsContext';



const BasicInfoSection = ({ formData, setFormData, errors, handleBlur }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [listOfCarCat, setListOfCarCat] = useState([])

    const {
        carsMakesList,
        carsMakesLoading,
        fetchCarsClass,
        carsClassList,
        carsClassLoading,
        fetchCarsModel,
        carsModelList,
        carsModelLoading,
        setCarsClassList,
        setCarsModelList
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
                        data.Data && setListOfCarCat(data.Data);
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
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Car Make */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Car Makes 
                            <span className="text-red-500">*</span>
                        </label>

                        {carsMakesLoading ? <p className='border p-2'>Loading...</p> : <Select
                            options={carsMakesList}
                            getOptionLabel={(option) => option.makeNamePl}
                            getOptionValue={(option) => String(option.makeId)}
                            value={
                                carsMakesList.find((c) => c.makeId === formData.makeId) || null
                            }
                            onChange={(selected) => {
                                setFormData({
                                    ...formData,
                                    makeId: selected ? selected.makeId : "",
                                })
                                selected && fetchCarsClass(selected.makeId)
                                !selected && setCarsClassList([])
                                !selected && setCarsModelList([])
                            }
                            }
                            placeholder="Select Car Makes"
                            isClearable
                            className='w-auto'
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: errors.makeId
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
                                            : errors.makeId
                                                ? "red"
                                                : "#9ca3af", // gray-400
                                    },
                                }),
                            }}
                        />}
                        {errors.makeId && (
                            <p className="mt-1 text-xs text-red-600">{errors.makeId}</p>
                        )}
                    </div>
                    {/* Car Class */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Car Classes 
                            {/* <span className="text-red-500">*</span> */}
                        </label>
                        {carsClassLoading ? <p className='border p-2'>Loading...</p> : <Select
                            options={carsClassList}
                            getOptionLabel={(option) => option.classNamePl}
                            getOptionValue={(option) => String(option.classId)}
                            value={
                                carsClassList.find((c) => c.classId === formData.classId) || null
                            }
                            onChange={(selected) => {
                                setFormData({
                                    ...formData,
                                    classId: selected ? selected.classId : "",
                                })
                                formData.makeId && selected && fetchCarsModel(formData.makeId, selected.classId)
                                !selected && setCarsModelList([])

                            }
                            }
                            placeholder="Select Car Class"
                            isClearable
                            className='w-auto'
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: errors.classId
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
                                            : errors.classId
                                                ? "red"
                                                : "#9ca3af", // gray-400
                                    },
                                }),
                            }}
                        />}
                        {errors.classId && (
                            <p className="mt-1 text-xs text-red-600">{errors.classId}</p>
                        )}
                    </div>
                    {/* Car Model */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Car Model 
                            {/* <span className="text-red-500">*</span> */}
                        </label>
                        {carsModelLoading ? <p className='border p-2'>Loading...</p> : <Select
                            options={carsModelList}
                            getOptionLabel={(option) => option.modelNamePl}
                            getOptionValue={(option) => String(option.modelId)}
                            value={
                                carsModelList.find((c) => c.modelId === formData.modelId) || null
                            }
                            onChange={(selected) => {
                                setFormData({
                                    ...formData,
                                    modelId: selected ? selected.modelId : "",
                                })
                                // fetchCarsClass(selected.classId)
                            }
                            }
                            placeholder="Select Car Class"
                            isClearable
                            className='w-auto'
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: errors.modelId
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
                                            : errors.modelId
                                                ? "red"
                                                : "#9ca3af", // gray-400
                                    },
                                }),
                            }}
                        />}
                        {errors.modelId && (
                            <p className="mt-1 text-xs text-red-600">{errors.modelId}</p>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    {/* Category */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Category <span className="text-red-500">*</span>
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
                            Year <span className="text-red-500">*</span>
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