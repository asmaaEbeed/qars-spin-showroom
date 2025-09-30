import React from 'react'
import Select from 'react-select';

const exteriorColors = [
    { Color_ID: 1, Hex_Code: "#FFFFFF", Name_PL: "White", Name_SL: "أبيض", isExterior: 1, Display_Order: 1 },
    { Color_ID: 2, Hex_Code: "#000000", Name_PL: "Black", Name_SL: "أسود", isExterior: 1, Display_Order: 2 },
    { Color_ID: 3, Hex_Code: "#C0C0C0", Name_PL: "Silver", Name_SL: "فضي", isExterior: 1, Display_Order: 3 },
    { Color_ID: 4, Hex_Code: "#808080", Name_PL: "Gray", Name_SL: "رمادي", isExterior: 1, Display_Order: 4 },
    { Color_ID: 5, Hex_Code: "#FF0000", Name_PL: "Red", Name_SL: "أحمر", isExterior: 1, Display_Order: 5 },
    { Color_ID: 6, Hex_Code: "#800000", Name_PL: "Maroon", Name_SL: "عنابي", isExterior: 1, Display_Order: 6 },
    { Color_ID: 7, Hex_Code: "#FFFF00", Name_PL: "Yellow", Name_SL: "أصفر", isExterior: 1, Display_Order: 7 },
    { Color_ID: 8, Hex_Code: "#808000", Name_PL: "Olive", Name_SL: "زيتوني", isExterior: 1, Display_Order: 8 },
    { Color_ID: 9, Hex_Code: "#00FF00", Name_PL: "Lime", Name_SL: "ليموني", isExterior: 1, Display_Order: 9 },
    { Color_ID: 10, Hex_Code: "#008000", Name_PL: "Green", Name_SL: "أخضر", isExterior: 1, Display_Order: 10 },
    { Color_ID: 11, Hex_Code: "#00FFFF", Name_PL: "Cyan", Name_SL: "سماوي", isExterior: 1, Display_Order: 11 },
    { Color_ID: 12, Hex_Code: "#008080", Name_PL: "Teal", Name_SL: "تركوازي", isExterior: 1, Display_Order: 12 },
    { Color_ID: 13, Hex_Code: "#0000FF", Name_PL: "Blue", Name_SL: "أزرق", isExterior: 1, Display_Order: 13 },
    { Color_ID: 14, Hex_Code: "#000080", Name_PL: "Navy", Name_SL: "كحلي", isExterior: 1, Display_Order: 14 },
    { Color_ID: 15, Hex_Code: "#FF00FF", Name_PL: "Magenta", Name_SL: "وردي فاتح", isExterior: 1, Display_Order: 15 },
    { Color_ID: 16, Hex_Code: "#800080", Name_PL: "Purple", Name_SL: "أرجواني", isExterior: 1, Display_Order: 16 },
    { Color_ID: 17, Hex_Code: "#D2691E", Name_PL: "Brown", Name_SL: "بني", isExterior: 1, Display_Order: 17 },
    { Color_ID: 18, Hex_Code: "#F5DEB3", Name_PL: "Beige", Name_SL: "بيج", isExterior: 1, Display_Order: 18 },
    { Color_ID: 19, Hex_Code: "#FF4500", Name_PL: "Orange", Name_SL: "برتقالي", isExterior: 1, Display_Order: 19 },
    { Color_ID: 20, Hex_Code: "#A52A2A", Name_PL: "Dark Brown", Name_SL: "بني غامق", isExterior: 1, Display_Order: 20 },
    { Color_ID: 21, Hex_Code: "#E6E6FA", Name_PL: "Lavender", Name_SL: "لافندر", isExterior: 1, Display_Order: 21 },
    { Color_ID: 22, Hex_Code: "#FA8072", Name_PL: "Salmon", Name_SL: "مرجاني", isExterior: 1, Display_Order: 22 },
    { Color_ID: 23, Hex_Code: "#2F4F4F", Name_PL: "Dark Slate Gray", Name_SL: "رمادي أردوازي غامق", isExterior: 1, Display_Order: 23 },
    { Color_ID: 24, Hex_Code: "#4682B4", Name_PL: "Steel Blue", Name_SL: "أزرق فولاذي", isExterior: 1, Display_Order: 24 }
  ];

  const interiorColors = [
    { Color_ID: 25, Hex_Code: "#FFFFFF", Name_PL: "White", Name_SL: "أبيض", isExterior: 0, Display_Order: 1 },
    { Color_ID: 26, Hex_Code: "#000000", Name_PL: "Black", Name_SL: "أسود", isExterior: 0, Display_Order: 2 },
    { Color_ID: 27, Hex_Code: "#C0C0C0", Name_PL: "Silver", Name_SL: "فضي", isExterior: 0, Display_Order: 3 },
    { Color_ID: 28, Hex_Code: "#808080", Name_PL: "Gray", Name_SL: "رمادي", isExterior: 0, Display_Order: 4 },
    { Color_ID: 29, Hex_Code: "#D2691E", Name_PL: "Brown", Name_SL: "بني", isExterior: 0, Display_Order: 5 },
    { Color_ID: 30, Hex_Code: "#F5DEB3", Name_PL: "Beige", Name_SL: "بيج", isExterior: 0, Display_Order: 6 },
    { Color_ID: 31, Hex_Code: "#8B4513", Name_PL: "Saddle Brown", Name_SL: "بني سرج", isExterior: 0, Display_Order: 7 },
    { Color_ID: 32, Hex_Code: "#A52A2A", Name_PL: "Dark Brown", Name_SL: "بني غامق", isExterior: 0, Display_Order: 8 },
    { Color_ID: 33, Hex_Code: "#FAEBD7", Name_PL: "Antique White", Name_SL: "أبيض قديم", isExterior: 0, Display_Order: 9 },
    { Color_ID: 34, Hex_Code: "#FFF5EE", Name_PL: "Seashell", Name_SL: "صدفي", isExterior: 0, Display_Order: 10 },
    { Color_ID: 35, Hex_Code: "#2F4F4F", Name_PL: "Dark Slate Gray", Name_SL: "رمادي أردوازي غامق", isExterior: 0, Display_Order: 11 },
    { Color_ID: 36, Hex_Code: "#708090", Name_PL: "Slate Gray", Name_SL: "رمادي أردوازي", isExterior: 0, Display_Order: 12 },
    { Color_ID: 37, Hex_Code: "#4682B4", Name_PL: "Steel Blue", Name_SL: "أزرق فولاذي", isExterior: 0, Display_Order: 13 },
    { Color_ID: 38, Hex_Code: "#778899", Name_PL: "Light Slate Gray", Name_SL: "رمادي أردوازي فاتح", isExterior: 0, Display_Order: 14 },
    { Color_ID: 39, Hex_Code: "#B0C4DE", Name_PL: "Light Steel Blue", Name_SL: "أزرق فولاذي فاتح", isExterior: 0, Display_Order: 15 }
  ];

const ColorSection = ({ formData, setFormData, errors, handleBlur }) => {
    return (
        <div>
            <h4 className="text-sm font-semibold flex items-center gap-2 my-3">
                Color Info
                <span className="flex-1 border-b-2 mt-2 border-gray-400"></span>
            </h4>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 shadow-md border p-4 my-4 rounded-lg">

                {/* Exterior Color */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Exterior Color
                    </label>
                    <div className="flex items-center">
                        {/* <div>
                            <input
                                type="color"
                                value={formData.colorExterior || "#000000"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        colorExterior: e.target.value,
                                    })
                                }
                                onBlur={() => handleBlur("colorExterior")}
                                className="h-10 w-10 rounded cursor-pointer"
                            />

                        </div> */}
                        <div className='w-full'>
                            
                            <Select options={exteriorColors}
                                getOptionLabel={(option) => option.Name_PL}
                                getOptionValue={(option) => String(option.Hex_Code)}
                                value={
                                    exteriorColors.find((c) => c.Name_PL === formData.exteriorColorNamePl) || null
                                }
                                onChange={(selected) =>
                                    setFormData({
                                        ...formData,
                                        exteriorColorNamePl: selected ? selected.Name_PL : "",
                                        exteriorColorNameSl: selected ? selected.Name_SL : "",
                                        colorExterior: selected ? selected.Hex_Code : "",
                                    })
                                }
                                placeholder="Select Car Name"
                                isClearable
                                className='w-full'
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        width: "100%",
                                        borderColor: errors.exteriorColorNamePl
                                            ? "red"
                                            : state.isFocused
                                                ? "#d6a23a" // tailwind primary-500 تقريباً
                                                : "#d1d5db", // gray-300
                                        boxShadow: state.isFocused
                                            ? "0 0 0 1px #d6a23a"
                                            : "none",
                                        "&:hover": {
                                            borderColor: state.isFocused
                                                ? "#d6a23a"
                                                : errors.exteriorColorNamePl
                                                    ? "red"
                                                    : "#9ca3af", // gray-400
                                        },
                                    }),
                                }}
                                formatOptionLabel={(option) => (
                                    <div className="grid grid-cols-5 items-center space-x-2">
                                        <span
                                            className="col-span-1 w-8 h-8 rounded-full border border-gray-300"
                                            style={{ backgroundColor: option.Hex_Code }}
                                        />
                                        <span className="col-span-2">{option.Name_PL}</span>
                                    </div>
                                )}

                            />
                        </div>
                    </div>
                    {errors.exteriorColorNamePl && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.exteriorColorNamePl}
                        </p>
                    )}
                    {errors.colorExterior && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.colorExterior}
                        </p>
                    )}
                </div>

                {/* Interior Color */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interior Color
                    </label>
                    <div className="flex items-center">
                        {/* <input
                            type="color"
                            value={formData.colorInterior || "#000000"}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    colorInterior: e.target.value,
                                })
                            }
                            onBlur={() => handleBlur("colorInterior")}

                            className="h-10 w-10 rounded cursor-pointer"
                        /> */}

                        <Select options={interiorColors}
                            getOptionLabel={(option) => option.Name_PL}
                            getOptionValue={(option) => String(option.Hex_Code)}
                            value={
                                interiorColors.find((c) => c.Name_PL === formData.interiorColorNamePl) || null
                            }
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    interiorColorNamePl: selected ? selected.Name_PL : "",
                                    interiorColorNameSl: selected ? selected.Name_SL : "",
                                    colorInterior: selected ? selected.Hex_Code : "",
                                })
                            }
                            placeholder="Select Car Name"
                            isClearable
                            className='w-full'
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    width: "100%",
                                    borderColor: errors.interiorColorNamePl
                                        ? "red"
                                        : state.isFocused
                                            ? "#d6a23a" // tailwind primary-500 تقريباً
                                            : "#d1d5db", // gray-300
                                    boxShadow: state.isFocused
                                        ? "0 0 0 1px #d6a23a"
                                        : "none",
                                    "&:hover": {
                                        borderColor: state.isFocused
                                            ? "#d6a23a"
                                            : errors.interiorColorNamePl
                                                ? "red"
                                                : "#9ca3af", // gray-400
                                    },
                                }),
                            }}
                            formatOptionLabel={(option) => (
                                <div className="grid grid-cols-5 items-center space-x-2">
                                    <span
                                        className="col-span-1 w-8 h-8 rounded-full border border-gray-300"
                                        style={{ backgroundColor: option.Hex_Code }}
                                    />
                                    <span className="col-span-2">{option.Name_PL}</span>
                                </div>
                            )}

                        />

                    </div>
                    {errors.colorInterior && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.colorInterior}
                        </p>
                    )}
                    {errors.interiorColorNamePl && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.interiorColorNamePl}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ColorSection