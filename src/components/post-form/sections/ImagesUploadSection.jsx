import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useState } from 'react'
import { usePosts } from '../../../context/PostsContext';
import { carAPI } from '../../../services/api';
import { toast } from 'react-toastify';

const ImagesUploadSection = ({ post = null, setStep, onClose }) => {

    const [isLoadingAddImg, setIsLoadingAddImg] = useState(false);
    const [currentFileUploading, setCurrentFileUploading] = useState(null);
    const [formData, setFormData] = useState({
        images: post?.images || [],
        imagesFiles: post?.imagesFiles || [],
    });
    const [errors, setErrors] = useState({});
    const { postCreatedId } = usePosts();


    const validationRoles = {
        images: { required: true, maxCount: 15 },
    }


    // Prepare Image For View only
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Check total images won't exceed max
        const totalImages = formData.images.length + files.length;
        if (totalImages > validationRoles.images.maxCount) {
            setErrors((prev) => ({
                ...prev,
                images: `Maximum ${validationRoles.images.maxCount} images allowed`,
            }));
            return;
        }

        const newImages = [];
        let loadedCount = 0;

        files.forEach((file) => {
            // Basic file type validation
            if (!file.type.startsWith("image/")) {
                setErrors((prev) => ({
                    ...prev,
                    images: "Only image files are allowed",
                }));
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                newImages.push(event.target.result);
                loadedCount++;

                if (loadedCount === files.length) {
                    setFormData((prev) => ({
                        ...prev,
                        images: [...prev.images, ...newImages],
                        imagesFiles: [...prev.imagesFiles, ...files],
                    }));
                    // Clear any previous image errors
                    setErrors((prev) => ({
                        ...prev,
                        images: "",
                        imagesFiles: "",
                    }));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Remove Image from view only
    const removeImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove),
            imagesFiles: prev.imagesFiles.filter((_, index) => index !== indexToRemove),
        }));
    };

    const validateField = (name, value, rules) => {
        if (!rules) return "";
        if (name === "images" && value.length > rules.maxCount)
            return `Maximum ${rules.maxCount} images allowed`;

        return "";
    };


    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRoles).forEach((field) => {
            const error = validateField(field, formData[field], validationRoles[field], post);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [formData, post]);


    // Upload Images to Server
    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm();
        if(formData.imagesFiles.length === 0){
            setErrors((prev) => ({
                ...prev,
                imagesFiles: "Please upload at least one image",
            }));
            return;
        }
        let uploadResponse = null
        for (const file of formData.imagesFiles) {

            setCurrentFileUploading(file)
            const fileName = `photo_${Date.now()}.jpg`;
            const imgFormData = new FormData();
            // imgFormData.append("Post_ID", 372);
            imgFormData.append("Post_ID", post !== null ? post.postId : postCreatedId);
            imgFormData.append("Our_Secret", process.env.REACT_APP_API_OUR_SECRET);
            imgFormData.append("PhotoBytes", file, fileName);
            try {
                setIsLoadingAddImg(true);
                uploadResponse = await carAPI.postUploadGalleryImage(imgFormData);
                uploadResponse.Code === "OK"
                    ? toast.success(uploadResponse.Desc)
                    : toast.error(uploadResponse.Desc);

            } catch (err) {
                toast.error("Upload failed");
            }
        }
        uploadResponse.Code === "OK" && setStep((prev) => prev + 1);
        setCurrentFileUploading(null);
        setIsLoadingAddImg(false);
    };
    return (

        <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col"
        >

            <div className='my-8 px-4'>

                <div className="md:col-span-2 mt-5">
                    {/* Image preview grid */}
                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                            {formData.images.map((image, index) => (
                                isLoadingAddImg && currentFileUploading.name === formData.imagesFiles[index].name ? <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center" key={index}>
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
                                        <p className="text-lg font-medium text-secondary-600">
                                            Loading car Images...
                                        </p>
                                    </div>
                                </div> : <div key={index} className="relative group">
                                    <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        className="h-32 w-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.images || errors.imagesFiles ? "border-red-500" : "border-gray-300"
                            } border-dashed rounded-md`}
                    >
                        <div className="space-y-1 text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                                >
                                    <p>Upload files</p>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleImageUpload}
                                        multiple
                                        accept="image/*"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 
                                <span clspaname="text-primary-600"> ({validationRoles.images.maxCount} images)</span>
                            </p>
                            {(errors.images || errors.imagesFiles) && (
                                <p className="mt-2 text-sm text-red-600">{errors.images || errors.imagesFiles}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoadingAddImg}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    {isLoadingAddImg
                        ? post
                            ? "Updating..."
                            : "Creating..."
                        : post
                            ? "Update & Next"
                            : "Save & Next"}
                </button>
            </div>
        </form>
    )
}

export default ImagesUploadSection