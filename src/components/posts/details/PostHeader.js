import React, { useState } from "react";
import BgImage from "../../../assets/images/Profile_Background.jpg";
import { Link } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";
import { useRef } from "react";
import PostDetailsModals from "../PostDetailsModals";
import { FaImage } from "react-icons/fa";

const PostHeader = ({
  currentPost,
  setSelectedCover,
  setModalType,
  setModalOpen,
  setModalData,
  modalOpen,
  modalType,
  modalData,
  selectedCover,
}) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Approved: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Draft: "bg-gray-100 text-gray-800 border-gray-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getTagBadge = (tag) => {
    const tagStyles = {
      New: "bg-emerald-500 text-white",
      Inspected: "bg-amber-500 text-white",
      Sold: "bg-red-500 text-white",
    };
    return tagStyles[tag] || "bg-gray-500 text-white";
  };
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-r z-10 from-secondary-900/90 to-black-600/90"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentPost?.rectangleImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:py-16 py-6 z-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/dashboard"
              className="text-white/70 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <svg
              className="h-4 w-4 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              to="/showroom/posts"
              className="text-white/70 hover:text-white transition-colors"
            >
              Posts
            </Link>
            <svg
              className="h-4 w-4 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-white font-medium">
              {currentPost?.carNamePl || "Car Details"}
            </span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col  md:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 justify-between">
          {/* Car Image */}
          <div className="flex items-center gap-4 md:flex-row">
            <div className="flex-shrink-0">
              <div className="w-48 h-36 lg:w-64 lg:h-48 relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                
                  <div className="flex-shrink-0 relative group">
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setSelectedCover(file);
                          // Open modal to confirm upload
                          setModalType("uploadCover");
                          setModalOpen(true);
                        }
                      }}
                      className="hidden"
                      id="cover-upload"
                    />
                    <div
                      className={`w-48 h-36 lg:w-64 lg:h-48 rounded-2xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-sm border-2
                                   border-dashed border-white/50 hover:border-white/80 cursor-pointer transition-colors duration-200
                                   
                                `}
                      onClick={handleLogoClick}
                      style={{ position: "relative" }}
                    >
                      {currentPost?.rectangleImageUrl ? (
                        <img
                          src={currentPost?.rectangleImageUrl}
                          alt="Partner Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/60 hover:text-white/80 transition-colors">
                          <FaImage className="h-8 w-8 mb-2" />
                        </div>
                      )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white/90 text-black/80 rounded-full p-2">
                            <FiUpload className="h-5 w-5" />
                          </span>
                        </div>
                    </div>
                  </div>
                
              </div>
            </div>

            {/* Car Info */}
            <div className="flex-1 min-w-0">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {currentPost?.categoryNamePl}
                  </h1>
                  <p className="text-xl text-white/80">
                    {currentPost?.carNamePl}
                  </p>
                </div>

                {/* Status and Tags */}
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                      currentPost?.postStatus
                    )}`}
                  >
                    {currentPost?.postStatus}
                  </span>

                  {currentPost?.tag && (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTagBadge(
                        currentPost?.tag
                      )}`}
                    >
                      {/* {currentPost.Tag === "New" && "Brand New"}
                    {currentPost.Tag === "Inspected" && "Inspected"}
                    {currentPost.Tag === "Sold" && "Sold"} */}
                      {currentPost?.tag}
                    </span>
                  )}

                  {currentPost?.pinToTop && (
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
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-sm">Category</p>
                <p className="text-white font-semibold">
                  {currentPost?.categoryNamePl}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-sm">Post Code</p>
                <p className="text-white font-semibold">
                  {currentPost?.postCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <ModalWrapper>
          {currentPost !== null && (
            <PostDetailsModals
              currentPost={currentPost}
              onClose={() => setModalOpen(false)}
              modalType={modalType}
              setModalData={setModalData}
              selectedCover={selectedCover}
            />
          )}
        </ModalWrapper>
      )}
    </div>
  );
};

const ModalWrapper = ({ children }) => (
  <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    {children}
  </div>
);

export default PostHeader;
