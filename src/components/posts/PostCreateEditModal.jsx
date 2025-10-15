import Stepper from "../post-form/sections/Stepper";
import PostForm from "../post-form/PostForm";
import { useState } from "react";
import { usePosts } from "../../context/PostsContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PostCreateEditModal = ({ onClose, post = null }) => {

    const [step, setStep] = useState(1);
    const { setPostCreatedId, setPostCreatedCode } = usePosts();

    const handleClose = () => {
        onClose();
        setStep(1);
        setPostCreatedId("");
        setPostCreatedCode("");
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            // onClick={(e) => { e.target === e.currentTarget && handleClose() }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col relative">
                <div className="flex justify-between items-center p-4 bg-primary text-white rounded-t-lg">
                    <h2 className="text-xl font-bold">
                        {post ? "Edit car for sale" : "New Car for sale"}
                    </h2>
                    <button type="button" onClick={handleClose} className="text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[80vh] relative ">
                    {post === null ? <Stepper onClose={handleClose} post={post} step={step} setStep={setStep} /> : <PostForm onClose={onClose} post={post} />}
                </div>
            </div>
        </div>
    )
}

export default PostCreateEditModal
