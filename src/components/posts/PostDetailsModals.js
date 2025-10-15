import React, { useState } from "react";
import { carAPI } from "../../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useCarContext } from "../../context/CarContext";
import {
  // ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";



const PostDetailsModals = ({
  currentPost,
  onClose,
  modalType,
  setModalData,
  selectedCover,
  // handleSendToReview
}) => {
  // const actions = [
  //   {
  //     label: "Send for Review",
  //     icon: ClockIcon,
  //     color: "text-blue-600",
  //     hover: "hover:bg-blue-50",
  //     value: () => handleSendToReview(),
  //   },
  //   // {
  //   //   label: "Mark as Approved",
  //   //   icon: CheckCircleIcon,
  //   //   color: "text-green-600",
  //   //   hover: "hover:bg-green-50",
  //   //   value: { status: "Approved", Post_Status: "Active" },
  //   // },
  //   // {
  //   //   label: "Reject Post",
  //   //   icon: XCircleIcon,
  //   //   color: "text-red-600",
  //   //   hover: "hover:bg-red-50",
  //   //   value: { status: "Rejected", Post_Status: "Rejected" },
  //   // },
  //   // {
  //   //   label: "Suspend Post",
  //   //   icon: PauseCircleIcon,
  //   //   color: "text-orange-600",
  //   //   hover: "hover:bg-orange-50",
  //   //   value: { status: "Suspended", Post_Status: "Suspended" },
  //   // },
  //   // {
  //   //   label: "Move to Archive",
  //   //   icon: ArchiveBoxIcon,
  //   //   color: "text-gray-600",
  //   //   hover: "hover:bg-gray-50",
  //   //   value: { status: "Archived", Post_Status: "Archived" },
  //   // },
  // ];
  const [loading, setLoading] = useState(false);

  const { fetchCarProfile } = useCarContext();

  const handleModalSubmit = async (type) => {
    // setLoading(true);
    // try {
    //   await updatePost(currentPost.id, data);
    //   onClose();
    // } catch (error) {
    //   console.error('Error updating post:', error);
    // } finally {
    //   setLoading(false);
    // }
    try {
      const param = {
        postId: currentPost.postId,
        RequestType: type,
        RequestFrom: "Partner",
      };

      const response = await carAPI.getCarRequests(param);
      const data = response.data;

      if (data.length > 0) {
        const status = data[0].requestStatus;
        if (status === "Completed" || status === "Pending") {
          await Swal.fire({
            icon: status === "Completed" ? "success" : "warning",
            title: `Your Request ${status}!`,
            html: `You sent request for ${type} is ${status.toLowerCase()}.`,
            showConfirmButton: false,
            confirmButtonText: "Confirm Request",
            confirmButtonColor: "#34c38f",
            showCancelButton: true,
            cancelButtonText: "Close",
            cancelButtonColor: "#f46a6a",
          }).then((result) => {
            if (result.dismiss) {
              onClose();
            }
          });
        }
      } else {
        await Swal.fire({
          icon: "question",
          title: "It's Offer Time!",
          html: `
            ${type} <b style="color: #34c38f; font-weight: 600; font-size: 20px;">FREE</b>
            <p style="margin-top: 21px; font-size: 20px; font-weight: 600;">It's a limited Offer!</p>
          `,
          confirmButtonText: "Confirm Request",
          confirmButtonColor: "#34c38f",
          showCancelButton: true,
          cancelButtonText: "Close",
          cancelButtonColor: "#f46a6a",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await carAPI.postCreateRequest(
              localStorage.getItem("userName"),
              param
            );
            toast.success("Your Request sent successfully");
            onClose();
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadCover = async () => {
    const formData = new FormData();
    formData.append("Post_ID", currentPost.postId);
    formData.append("Our_Secret", process.env.REACT_APP_API_OUR_SECRET);
    formData.append("PhotoBytes", selectedCover, "cover.jpg");

    try {
      setLoading(true);
      const url =
        "https://qarsspintest.smartvillageqatar.com/QarsSpinAPI/BrowsingRelatedApi.asmx/UploadPostCoverPhoto";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setModalData({});
      fetchCarProfile(currentPost.postCode);
      onClose();

      // لو السيرفر بيرجع JSON
      const data = await response.json();
      toast.success("Post cover photo uploaded successfully");

      return data;
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const modalContent = {
    uploadCover: (
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Upload Cover Image
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              {selectedCover ? selectedCover.name : "No file selected"}
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleUploadCover()}
                disabled={loading}
                className={`w-full px-4 py-2 rounded-lg ${
                  !selectedCover
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                } transition-colors`}
              >
                {loading ? "Uploading..." : "Upload Cover"}
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    requests: (
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Requests</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleModalSubmit("Request New Tag")}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Request New Tag
          </button>
          <button
            onClick={() => handleModalSubmit("Request Inspected Tag")}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Request Inspected Tag
          </button>
          <button
            onClick={() => handleModalSubmit("Request to Feature a Post")}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Request Featured Status
          </button>
        </div>
      </div>
    ),
    status: (
      <div className="max-w-lg md:w-[800px] mx-auto bg-white rounded-xl shadow-lg p-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            Change Post Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        {/* <div className="grid gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => action.value()}
                className={`flex items-center justify-between w-full px-4 py-4 text-sm font-medium border rounded-lg transition ${action.hover} focus:outline-none mb-4`}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${action.color}`} />
                  {action.label}
                </span>
              </button>
            );
          })}
        </div> */}
      </div>
    ),
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative">{modalContent[modalType]}</div>
    </div>
  );
};

export default PostDetailsModals;
