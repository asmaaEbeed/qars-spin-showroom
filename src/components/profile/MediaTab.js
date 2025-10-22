import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ImageGallery from "../posts/details/ImageGallery";
import { ShowroomProfileAPI } from "../../services/api/ShowroomProfile.api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const MediaTab = ({ partner }) => {
  const { id } = useParams();
  const [postImgs, setPostImgs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [formData, setFormData] = useState({
    ...partner,
    images: partner?.gallery || [],
  });

  const validationRules = {
    images: { required: true, maxCount: 100 },
  };
  useEffect(() => {
    if (partner.gallery.length > 0) {
      setPostImgs(partner.gallery);
    }
  }, [partner]);

  const removeImage = async (image) => {
    try {
      setIsLoadingDelete(true);
      const res = await ShowroomProfileAPI.deleteGalleryImage({
        partnerId: partner.partnerId || id,
        imageId: image.mediaId,
      });
      if (res.status === 200) {
        setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.mediaId !== image.mediaId),
        }));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleImageUpload = async (e) => {
    setErrors({});
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

    files.forEach((file) => {
      // Basic file type validation
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          images: "Only image files are allowed",
        }));
        return;
      }
    });
    try {
      setIsLoading(true);
      const res = await ShowroomProfileAPI.uploadGalleryImage(
        partner.partnerId,
        files
      );
      // Transform returned data to match expected format from fileUrl to mediaUrl
      // const transformed = res.data.map((item) => ({
      //   ...item,
      //   mediaUrl: item.fileUrl,
      // }));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...res.data],
      }));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
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

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.mediaUrl}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full object-cover rounded-md"
                    onClick={() => setCurrentIndex(index)}
                  />
                  <button
                    type="button"
                    disabled={isLoadingDelete}
                    onClick={() => removeImage(image)}
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
            </div>
          )}
          {isLoading && (
            <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-sm font-medium text-secondary-600">
                  Loading car Images...
                </p>
              </div>
            </div>
          )}

          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
              errors.images ? "border-red-500" : "border-gray-300"
            } border-dashed rounded-md`}
          >
            <div className="space-y-1 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload files</span>
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

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-secondary-800">360° View</h2>
        </div>
        <div className="p-6">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-secondary-100 flex items-center justify-center">
              <svg
                className="h-16 w-16 text-secondary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 rounded-2xl shadow-lg">
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  360° View Coming Soon
                </h3>
                <div className="text-secondary-500">
                  <p>Interactive 360° car view will be available here</p>

                  <div className="w-full h-[500px] mt-4">
                    <iframe
                      src={partner.spin360Url}
                      title="360° View"
                      className="w-full h-full rounded-2xl border-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
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
export default MediaTab;
