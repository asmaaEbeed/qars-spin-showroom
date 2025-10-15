import React, { useEffect, useRef, useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { FiUpload, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { dashboardAPI, ShowroomProfileAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ProfileHeader = ({ partner }) => {
  const { uploadLogo } = useProfile();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [partnerLogoUrl, setPartnerLogo] = useState(partner.logoUrl);

  // reviewed
  const [stats, setStats] = useState({
    visitsCount: 0,
    activePosts: 0,
    followersCount: 0,
    averageRating: 0,
  });

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      await Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload an image file",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    // Upload the file
    try {
      const result = await ShowroomProfileAPI.uploadLogo(
        partner.partnerId,
        file
      );

      if (result.status === 200) {
        setPartnerLogo(result.data.fileUrl);
        await Swal.fire({
          icon: "success",
          title: "Upload Success",
          text: "Logo uploaded successfully.",
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      await Swal.fire({
        icon: "error",
        title: "Upload Error",
        text: "An error occurred while uploading the logo. Please try again.",
        confirmButtonColor: "#4f46e5",
      });
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = async (e) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Remove Logo",
      text: "Are you sure you want to remove the logo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setIsUploading(true);
        const result = await uploadLogo(null);
        if (result.success) {
          setPreviewUrl(null);
          await Swal.fire({
            icon: "success",
            title: "Logo Removed",
            text: "The logo has been removed successfully",
            confirmButtonColor: "#4f46e5",
          });
        } else {
          throw new Error(result.error || "Failed to remove logo");
        }
      } catch (error) {
        console.error("Error removing logo:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An error occurred while removing the logo",
          confirmButtonColor: "#4f46e5",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Reviewed

  useEffect(() => {
    if (user.userId === null) return;
    const fetchStats = async () => {
      try {
        const res = await dashboardAPI.getTopCounters(user.partnerId);
        setStats({
          visitsCount: res.data.visitsCount,
          activePosts: res.data.activePosts,
          followersCount: res.data.followersCount,
          averageRating: res.data.averageRating,
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${partnerLogoUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r z-10 from-secondary-900/90 to-black-600/90"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 z-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Logo/Avatar */}
          <div className="flex-shrink-0 relative group">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />
            <div
              className={`w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-sm border-2
                 border-dashed border-white/50 hover:border-white/80 cursor-pointer transition-colors duration-200
                 
              `}
              onClick={handleLogoClick}
              style={{ position: "relative" }}
            >
              {partnerLogoUrl ? (
                <img
                  src={partnerLogoUrl}
                  alt="Partner Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/60 hover:text-white/80 transition-colors">
                  <FiUpload className="h-8 w-8 mb-2" />
                  <span className="text-xs text-center px-2">
                    {isUploading ? "Uploading..." : "Upload Logo"}
                  </span>
                </div>
              )}

              {!isUploading && (partnerLogoUrl || previewUrl) && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 text-black/80 rounded-full p-2">
                    <FiUpload className="h-5 w-5" />
                  </span>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />

            {/* { (partnerLogoUrl || previewUrl) && (
              <button
                onClick={handleRemoveLogo}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
                title="Remove logo"
                disabled={isUploading}
              >
                <FiX className="h-4 w-4" />
              </button>
            )} */}
          </div>

          {/* Partner Info */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white">
                    {partner.partnerNameEn}
                  </h1>
                  {partner.isFeatured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xl text-white/80 mb-3">
                  {partner.partnerNameAr}
                </p>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  {partner.partnerStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {Object.entries(stats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center"
                >
                  <p className="text-white/80 text-sm capitalize">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </p>
                  <p className="text-white font-bold text-2xl mt-1">
                    {key === "averageRating" ? `${value}/5` : value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
