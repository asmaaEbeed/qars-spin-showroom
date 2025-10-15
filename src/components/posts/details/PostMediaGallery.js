import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import { carAPI } from "../../../services/api/carForSaleProfile.api";
import { toast } from "react-toastify";

const PostMediaGallery = ({ currentPost = {} }) => {
  // Reviewd
  const [isLoading, setIsLoading] = useState(false);
  const [postImgs, setPostImgs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  // Not Reviewd
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ...currentPost,
    images: currentPost?.images || [],
  });
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const validationRules = {
    images: { required: true, maxCount: 15 },
  };

  const fetchCarMedia = async () => {
    try {
      setIsLoading(true);
      const response = await carAPI.getCarPhotos(currentPost.postCode);
      setIsLoading(false);
      setPostImgs(response.data);
      setFormData({ ...formData, images: response.data });
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const removeImage = async (mediaId) => {
    try {
      setIsLoadingDelete(true);
      const data = await carAPI.postDeleteGalleryImg(mediaId); // لو الـ API بترجع JSON
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((item) => item.mediaId !== mediaId),
      }));
      toast.dismiss();
      toast.success("Image deleted successfully");
      setCurrentIndex(null);

    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Image delete failed");
      throw error;
    } finally {
      setIsLoadingDelete(false);
    }
  };

  // Reviewd Upload Image
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check total images won't exceed max
    const totalImages = formData.images.length + files.length;
    if (totalImages > validationRules.images.maxCount) {
      setErrors((prev) => ({
        ...prev,
        images: `Maximum ${validationRules.images.maxCount} images allowed`,
      }));
      return;
    }

    files.forEach(async (file) => {
      // Basic file type validation
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          images: "Only image files are allowed",
        }));
        return;
      }
      const fileName = `photo_${Date.now()}.jpg`;
      const formData = new FormData();
      formData.append("Post_ID", currentPost.postId);
      formData.append("Our_Secret", process.env.REACT_APP_API_OUR_SECRET);
      formData.append("PhotoBytes", file, fileName);

      try {
        setIsLoadingAdd(true);
        const response = await carAPI.postUploadGalleryImage(formData);
        if (response.Code === "OK") {

          toast.dismiss();
          toast.success(response.Desc);
          fetchCarMedia();
        } else {
          toast.error(response.Desc);
        }
      } catch (err) {
        console.error("Upload failed:", err);
        toast.error("Upload one image failed");
        throw err;
      } finally {
        setIsLoadingAdd(false);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(currentPost).length === 0 || postImgs.length > 0) return;
    fetchCarMedia();
  }, [currentPost]);

  return (
    <div className="min-h-full">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-secondary-800">
            Photo Gallery
          </h2>
        </div>
        <div className="md:col-span-2 mt-5 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images *
          </label>

          {/* Image preview grid */}
          {isLoading ? (
            <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-lg font-medium text-secondary-600">
                  Loading car Images...
                </p>
              </div>
            </div>
          ) : (
            formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group border">
                    <img
                      src={image.mediaUrl}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full object-cover rounded-md"
                      onClick={() => setCurrentIndex(index)}
                    />
                    <button
                      type="button"
                      disabled={isLoadingDelete}
                      onClick={() => removeImage(image.mediaId)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isLoadingDelete ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent mx-auto "></div>
                      ) : (
                        <XMarkIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
                {isLoadingAdd && (
                  <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
                      <p className="text-sm font-medium text-secondary-600">
                        Loading car Images...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
              errors.images ? "border-red-500" : "border-gray-300"
            } border-dashed rounded-md`}
          >
            <div className="space-y-1 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
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
                PNG, JPG, GIF up to 10MB (max {validationRules.images.maxCount}{" "}
                images)
              </p>
              {errors.images && (
                <p className="mt-2 text-sm text-red-600">{errors.images}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview */}

      {currentIndex !== null && (
        <ImageGallery
          setCurrentIndex={setCurrentIndex}
          postImgs={postImgs}
          currentIndex={currentIndex}
        />
      )}
    </div>
  );
};

export default PostMediaGallery;
