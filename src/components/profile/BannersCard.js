import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { ShowroomProfileAPI } from "../../services/api";

const BannersCard = ({ partner, onUploadBanner, isUploading = false }) => {
  const [uploadingType, setUploadingType] = useState(null);
  const [previewUrls, setPreviewUrls] = useState({
    bannerArUrl: partner.bannerArUrl,
    bannerEnUrl: partner.bannerEnUrl,
  });

  const onDrop = useCallback((acceptedFiles, type) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrls((prev) => ({
          ...prev,
          [type]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
      handleBannerUpload(type, file);
    }
  }, []);

  const handleBannerUpload = async (type, file) => {
    try {
      // const bannerUrl = await onUploadBanner(type, file);

      try {
        setUploadingType(type);
        let result
        if(type === 'bannerEnUrl'){
          result = await ShowroomProfileAPI.uploadBannerPl(
            partner.partnerId,
            file
          );
        }else{
          result = await ShowroomProfileAPI.uploadBannerSl(
            partner.partnerId,
            file
          );
        }

        if (result.status === 200) {
          setPreviewUrls((prev) => ({
            ...prev,
            [type]: result.data.fileUrl,
          }));
          await Swal.fire({
            icon: "success",
            title: "Upload Success",
            text: "Logo uploaded successfully.",
            confirmButtonColor: "#4f46e5",
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Upload Error",
          text: "An error occurred while uploading the logo. Please try again.",
          confirmButtonColor: "#4f46e5",
        });
        setPreviewUrls((prev) => ({
          ...prev,
          [type]: partner[type],
        }));
      } finally {
        setUploadingType(null);
      }

      // If the upload was successful, update the preview with the returned URL
      // if (bannerUrl) {
      //   setPreviewUrls(prev => ({
      //     ...prev,
      //     [type]: bannerUrl
      //   }));
      // }
    } catch (error) {
      console.error(`Error uploading ${type} banner:`, error);
      // Optionally show error to user
    } finally {
      setUploadingType(null);
    }
  };

  const {
    getRootProps: getPrimaryRootProps,
    getInputProps: getPrimaryInputProps,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (files) => onDrop(files, "bannerEnUrl"),
    disabled: uploadingType === "bannerEnUrl" || isUploading,
  });

  const {
    getRootProps: getSecondaryRootProps,
    getInputProps: getSecondaryInputProps,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (files) => onDrop(files, "bannerArUrl"),
    disabled: uploadingType === "bannerArUrl" || isUploading,
  });

  const renderBannerUpload = (type, label) => {
    const isUploadingThis = uploadingType === type;
    const bannerUrl = previewUrls[type] || partner[type];
    const dropzoneProps =
      type === "bannerEnUrl" ? getPrimaryRootProps() : getSecondaryRootProps();
    const inputProps =
      type === "bannerEnUrl"
        ? getPrimaryInputProps()
        : getSecondaryInputProps();

    return (
      <div>
        <h4 className="text-sm font-medium text-secondary-700 mb-3">{label}</h4>
        <div
          {...dropzoneProps}
          className={`relative border-2 border-dashed rounded-lg overflow-hidden h-40 flex flex-col items-center justify-center transition-colors ${
            isUploadingThis
              ? "border-primary-400 bg-primary-50"
              : "border-gray-300 hover:border-primary-300 bg-gray-50"
          }`}
          dir={type === "bannerArUrl" ? "rtl" : "ltr"}
        >
          <input {...inputProps} />
          {bannerUrl ? (
            <div className="relative w-full h-full">
              <img
                src={bannerUrl}
                alt={`${label} Banner Preview`}
                className="w-full h-full object-cover"
              />
              {isUploadingThis && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-4">
              <svg
                className={`mx-auto h-10 w-10 mb-2 ${
                  isUploadingThis ? "text-primary-400" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p
                className={`text-sm ${
                  isUploadingThis ? "text-primary-600" : "text-gray-600"
                }`}
              >
                {isUploadingThis
                  ? "Uploading..."
                  : type === "bannerEnUrl"
                  ? "Drag & drop an image here, or click to select"
                  : "اسحب وأفلت صورة هنا، أو انقر للاختيار"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
      <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
        <h3 className="text-lg font-semibold text-secondary-800">Banners</h3>
      </div>
      <div className="p-6 space-y-6">
        {renderBannerUpload("bannerEnUrl", "English Banner")}
        {renderBannerUpload("bannerArUrl", "Arabic Banner")}
      </div>
    </div>
  );
};

export default BannersCard;
