import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { managementAPI } from '../../../services/api/carForSaleManagement.api';

const TechDescriptionSection = ({ formData, setFormData, errors, handleBlur, setErrors }) => {
    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslate = async (
        sourceLang,
        targetLang,
        sourceField,
        targetField
    ) => {
        const textToTranslate = formData[sourceField];
        if (!textToTranslate) return;

        setIsTranslating(true);

        try {
            const params = {
                text: textToTranslate,
                SourceLanguageCode: sourceLang,
                TargetLanguageCode: targetLang,
            }

            const res = await managementAPI.translate(params);
            const data = await res.data;
            setFormData((prev) => ({
                ...prev,
                [targetField]: data.translatedText,
            }));
        } catch (err) {
            console.error("Translation failed:", err);
            alert("Translation failed. Try again.");
        } finally {
            setIsTranslating(false);
        }
    };
    return (
        <div className='my-8'>{/* Technical Description */}
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                Technical Description
                <span className="flex-1 border-b-2 mt-2 border-gray-400"></span>
            </h4>

            <div className="flex flex-col md:flex-row  items-end bg-gray-50 shadow-md border p-4 mb-2 rounded-lg">
                {/* Technical Description (English) */}
                <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Technical Description (English)
                    </label>
                    <textarea
                        rows={3}
                        value={formData.technicalDescriptionPl}
                        onChange={(e) =>{
                            setErrors({
                                ...errors,
                                technicalDescriptionPl: "",
                            })
                            setFormData({
                                ...formData,
                                technicalDescriptionPl: e.target.value,
                            })}
                        }
                        name="technicalDescriptionPl"
                        onBlur={() => handleBlur("technicalDescriptionPl")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Techniczny opis pojazdu po polsku..."
                    />
                    {errors.technicalDescriptionPl && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.technicalDescriptionPl}
                        </p>
                    )}
                </div>

                {/* Translate Buttons */}
                <div className="mx-1 mb-2 w-full md:w-14 flex flex-col gap-3 items-center justify-center h-full">
                    <button
                        type="button"
                        onClick={() =>
                            handleTranslate(
                                "en",
                                "ar",
                                "technicalDescriptionPl",
                                "technicalDescriptionSl"
                            )
                        }
                        disabled={isTranslating}
                        className={`w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all ${isTranslating ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        title="Translate to Arabic"
                    >
                        <span className="text-sm font-medium text-gray-700">Ar</span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            handleTranslate(
                                "ar",
                                "en",
                                "technicalDescriptionSl",
                                "technicalDescriptionPl"
                            )
                        }
                        disabled={isTranslating}
                        className={`w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all ${isTranslating ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        title="Translate to English"
                    >
                        <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">En</span>
                    </button>
                </div>

                {/* Technical Description (Arabic) */}
                <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Technical Description (Arabic)
                    </label>
                    <textarea
                        rows={3}
                        value={formData.technicalDescriptionSl}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                technicalDescriptionSl: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="الوصف الفني ...."
                        onBlur={() => handleBlur("technicalDescriptionSl")}
                    />
                    {errors.technicalDescriptionSl && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.technicalDescriptionSl}
                        </p>
                    )}
                </div>
            </div></div>
    )
}

export default TechDescriptionSection