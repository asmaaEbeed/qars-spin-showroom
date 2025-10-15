import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { FiUpload } from "react-icons/fi";
import { toast } from 'react-toastify';
import { usePosts } from '../../../context/PostsContext';
import { useAuth } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';

const ProfileUploadImg = ({ post = null, onClose, setStep }) => {
    const fileInputRef = useRef(null);
    const [isLoadingAddImg, setIsLoadingAddImg] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState(null);
    const { postCreatedId, setPostCreatedId, setPostCreatedCode, fetchPosts } = usePosts();
    const { user } = useAuth();
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(fileData === null) {
            setError("Please upload an image file");
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append("Post_ID", post ? post.postId : postCreatedId);
        // formData.append("Post_ID", post.postId);
        formData.append("Our_Secret", process.env.REACT_APP_API_OUR_SECRET);
        formData.append("PhotoBytes", fileData, "cover.jpg");

        try {
            setIsLoadingAddImg(true);
            const url =
                "https://qarsspintest.smartvillageqatar.com/QarsSpinAPI/BrowsingRelatedApi.asmx/UploadPostCoverPhoto";
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // لو السيرفر بيرجع JSON
            const data = await response.json();
            toast.success("Post cover photo uploaded successfully");
            fetchPosts({ partnerId: user.partnerId || id });
            setStep((prev) => prev + 1);

            return data;
        } catch (err) {
            console.error("Upload failed:", err);
            throw err;
        } finally {
            setIsLoadingAddImg(false);
        }
    };

    const handleFileChange = async (e) => {
        setError(null);
        const file = e.target.files[0];
        if (!file) return;
        setFileData(file)

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

        // Set preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleLogoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col"
        >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mt-6">Upload Cover Image</h2>
            <div className="flex-shrink-0 relative text-center">

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    disabled={isLoadingAddImg}
                />
                <div
                    className={`group mx-auto my-4 w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-xl bg-white/10 backdrop-blur-md border-2 border-solid border-gray-300 hover:border-primary-500 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${error ? "border-red-500" : ""}`}
                    onClick={!isLoadingAddImg ? handleLogoClick : undefined}
                    tabIndex={0}
                    onKeyDown={(e) => { if (!isLoadingAddImg && (e.key === 'Enter' || e.key === ' ')) handleLogoClick(); }}
                    aria-label="Upload profile image"
                >
                    {(post?.rectangleImageUrl || previewUrl) ? (
                        <>
                            <img
                                src={previewUrl || post?.rectangleImageUrl}
                                alt="Partner Logo"
                                className="w-full h-full object-cover"
                            />

                            {/* Hover overlay */}
                            {!isLoadingAddImg && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white text-primary-600 rounded-full p-3 shadow-lg">
                                        <FiUpload className="h-5 w-5" />
                                    </span>
                                </div>
                            )}
                        </>
                    ) : (
                        // Box with upload icon
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 transition-colors bg-gray-100">
                            <FiUpload className={`h-8 w-8 mb-2 ${error ? "text-red-500" : ""}`} />
                            <span className={`text-sm text-center px-2 ${error ? "text-red-500" : ""}`}>
                                {isLoadingAddImg ? "Uploading..." : "Upload Post Cover Photo"}
                            </span>
                        </div>
                    )}

                    {/* Loading Spinner */}
                    {isLoadingAddImg && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                        </div>
                    )}
                </div>
                <p className={`mx-auto text-sm text-gray-600 mt-2 italic my-4 ${error ? "text-red-500" : ""}`}>Select a professional Cover Image for your Car</p>
            </div>
            <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    type="button"
                    onClick={() => {onClose(); setStep(1); setPostCreatedId(""); setPostCreatedCode("");}}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoadingAddImg}
                    className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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

export default ProfileUploadImg