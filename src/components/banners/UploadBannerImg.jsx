import {  PhotoIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from "react";
import { FiUpload } from 'react-icons/fi';

const UploadBannerImg = ({ viewFile, setUploadFile, slot }) => {
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);
    const handleUploadFile = (e) => {
        setError("");
        const file = e.target.files?.[0] ?? null;
        if(file.type !== "image/jpeg" &&
             file.type !== "image/png" &&
             file.type !== "image/bmp" &&
             file.type !== "image/jpg" ) {
            setError("Allowed file types are: .jpeg, .png, .bmp, .jpg");
            return;
        }
        setUploadFile(file);
    }
    return (
        <div className="space-y-6">

            {/* ✅ Preview Box */}
            <div className={`hover:cursor-pointer relative group rounded-xl border bg-gray-100 h-[180px] flex items-center justify-center shadow-inner overflow-hidden ${error ? "border-red-500" : ""}`} onClick={() =>
                fileInputRef.current.click()
            }>
                {/* Dark overlay */}
                <div className={`absolute inset-0  opacity-0  transition-opacity duration-300 ${viewFile ? "group-hover:opacity-50 bg-black/50" : "group-hover:opacity-100 bg-gray-400"}`} />

                {/* Icon + Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiUpload className="w-16 h-16 mb-2 text-white" />
                    <p className="text-white text-center">Click to upload {slot === "pl" ? "English" : "Arabic"} banner</p>
                </div>
                {viewFile ? (
                    <img
                        src={viewFile}
                        className="w-full h-full object-cover"
                        alt="Banner Preview"
                    />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <PhotoIcon className="w-16 h-16 mb-2" />
                        <p className="text-sm">No {slot === "pl" ? "English" : "Arabic"} banner uploaded</p>
                    </div>
                )}
            </div>

            {/* ✅ Upload Button */}
            <div>
                {/* <button
                    type="button"
                    onClick={() =>
                        fileInputRef.current.click()
                    }
                    className="px-5 py-3 bg-primary-400 text-white rounded-xl hover:bg-primary-700 
                               flex items-center gap-2 shadow-md w-fit transition active:scale-95 m-auto"
                >
                    <ArrowUpOnSquareIcon className="w-5 h-5" />
                    Choose New Image
                </button> */}

                <input
                    ref={fileInputRef}

                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUploadFile(e)}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    )
}

export default UploadBannerImg