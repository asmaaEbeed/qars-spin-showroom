import React, { useState } from 'react'
import {
    TagIcon,
    CheckBadgeIcon,
    StarIcon,
    CameraIcon,
} from "@heroicons/react/24/outline";
import { usePosts } from "../../../context/PostsContext";
import { useAuth } from '../../../context/AuthContext';
import { useAddCar360Url } from '../../../pages/hooks/useCar360Request';
import SelectCurrencyModal from '../../../pages/payment/SelectCurrencyModal';
import { useHandlePostRequest } from '../../posts/hook/handlePostRequest';
import { usePaymentContext } from '../../../context/PaymentContext';

const AddOnsStep = ({ currentPost = null, onClose, setStep }) => {
    const { postCreatedId } = usePosts();
    const { user } = useAuth();
    const [selectCurrencyOpen, setSelectCurrencyOpen] = useState(false);
    const { onGetQarsServices } = usePaymentContext();
    // AddOns Request Types
    const addons = [
        {
            title: user.role === "superAdmin" ? "Add 360 Image URL" : "Request 360 Photo Session",
            description: "Submit a request to add an interactive 360° image view.",
            icon: <CameraIcon className="w-8 h-8 text-primary-600" />,
            view: true
        },
        {
            title: "Request New Tag",
            description: "Suggest a new tag to categorize and organize content better.",
            icon: <TagIcon className="w-8 h-8 text-indigo-600" />,
            view: user.role !== "superAdmin"
        },
        {
            title: "Request Inspected Tag",
            description: "Ask for a tag to be reviewed and verified for accuracy.",
            icon: <CheckBadgeIcon className="w-8 h-8 text-green-600" />,
            view: user.role !== "superAdmin"

        },
        {
            title: "Request to Feature a Post",
            description: "Highlight a post to gain more visibility and engagement.",
            icon: <StarIcon className="w-8 h-8 text-yellow-600" />,
            view: user.role !== "superAdmin"

        },
    ];
    const handleAdd360 = useAddCar360Url(currentPost?.car.postId || postCreatedId);
    const { handleSubmitRequest } = useHandlePostRequest(setSelectCurrencyOpen);

    const handleSubmitRequests = (addon) => {
        if (addon.title === "Add 360 Image URL") {
            handleAdd360(currentPost?.car)
        } else {
            handleModalSubmit(addon.title)
        }
    }
    const handleModalSubmit = async (type) => {
        try {
            const res = await onGetQarsServices();
            handleSubmitRequest(type, postCreatedId, res.request360);
        } catch (e) {
            console.log(e);
        }

    };




    return (
        <div>
            <div className="p-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                {addons.map((addon, idx) => (
                    addon.view ? <div
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
                    </div> : <div key={idx}></div>
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
            <SelectCurrencyModal open={selectCurrencyOpen} setOpen={setSelectCurrencyOpen} />
        </div>
    )
}

export default AddOnsStep