import React from 'react'
import Swal from 'sweetalert2';
import { carAPI } from '../../../services/api';
import { toast } from 'react-toastify';
import {
    TagIcon,
    CheckBadgeIcon,
    StarIcon,
    CameraIcon,
} from "@heroicons/react/24/outline";
import { usePosts } from "../../../context/PostsContext";
import { useAuth } from '../../../context/AuthContext';
import { useAddCar360Url } from '../../../pages/hooks/useCar360Request';

const AddOnsStep = ({ currentPost = null, onClose, setStep }) => {
    const { postCreatedId } = usePosts();
    const { user } = useAuth();

    // AddOns Request Types
    const addons = [
        {
            title: user.role === "superAdmin" ? "Add 360 Image URL" : "Request 360 Photo Session",
            description: "Submit a request to add an interactive 360° image view.",
            icon: <CameraIcon className="w-8 h-8 text-primary-600" />,
        },
        {
            title: "Request New Tag",
            description: "Suggest a new tag to categorize and organize content better.",
            icon: <TagIcon className="w-8 h-8 text-indigo-600" />,
        },
        {
            title: "Request Inspected Tag",
            description: "Ask for a tag to be reviewed and verified for accuracy.",
            icon: <CheckBadgeIcon className="w-8 h-8 text-green-600" />,
        },
        {
            title: "Request to Feature a Post",
            description: "Highlight a post to gain more visibility and engagement.",
            icon: <StarIcon className="w-8 h-8 text-yellow-600" />,
        },
    ];
    const handleAdd360 = useAddCar360Url(currentPost?.car.postId || postCreatedId);

    const handleSubmitRequests = (addon) => {
        if (addon.title === "Add 360 Image URL") {
            handleAdd360(currentPost?.car)
        } else {
            handleModalSubmit(addon.title)
        }
    }
    const handleModalSubmit = async (type) => {
        try {
            const param = {
                postId: currentPost !== null ? currentPost?.postId : postCreatedId,
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
                    })
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
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    };




    return (
        <div>
            <div className="p-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                {addons.map((addon, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleSubmitRequests(addon)}
                        className="flex items-start p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex-shrink-0">{addon.icon}</div>
                        <div className="ml-3">
                            <h3 className="text-sm font-semibold text-gray-900">
                                {addon.title}
                            </h3>
                            <p className="text-xs text-gray-500">{addon.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex mt-4 justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                    Finish & Close
                </button>

            </div>
        </div>
    )
}

export default AddOnsStep