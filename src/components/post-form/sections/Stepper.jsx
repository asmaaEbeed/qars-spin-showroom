import React, { useState } from "react";
import PostForm from "../PostForm";
import ImagesUploadSection from "./ImagesUploadSection";
import ProfileUploadImg from "./ProfileUploadImg";
import AddOnsStep from "./AddOnsStep";
import PostSpecsStep from "./PostSpecsStep";

const Stepper = ({ onClose, post = null, step = 1, setStep }) => {
    const steps = [
        { id: 1, label: "Info" },
        { id: 2, label: "Cover" },
        { id: 3, label: "Gallery" },
        { id: 4, label: "Specs" },
        { id: 5, label: "Add-ons" },
    ];

    return (
        <div className="w-full mx-auto">
            {/* Step bullets */}
            <div className="grid md:grid-cols-5 grid-cols-3 justify-between my-6">
                {steps.map((s) => (
                    <div
                        key={s.id}
                        className={`flex flex-col items-center flex-1 relative text-center`}
                    >
                        {/* Circle */}
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full relative z-10  border-2 
              ${step === s.id
                                    ? "bg-primary-600 text-white border-primary-600"
                                    : step > s.id
                                        ? "bg-green-600 text-white border-green-600"
                                        : "bg-gray-200 text-gray-500 border-gray-300"
                                }`}
                        >
                            {s.id}
                        </div>
                        {/* Label */}
                        <p
                            className={`mt-2 sm:text-sm text-xs ${step >= s.id ? "text-gray-900" : "text-gray-400"
                                }`}
                        >
                            {s.label}
                        </p>

                        {/* Line between steps */}
                        {s.id !== steps.length && (
                            <div
                                className={`absolute top-5 sm:left-[100px] left-[51px] w-full h-0 md:h-0.5 z-0 ${step > s.id
                                    ? "bg-green-600"
                                    : step === s.id
                                        ? "bg-primary-600"
                                        : "bg-gray-200"
                                    }`}
                            ></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Step content */}
            <div className="border rounded-lg shadow mx-3">
                {step === 1 && <div>
                    <PostForm onClose={onClose} post={post} setStep={setStep} step={step} />

                </div>}
                {step === 2 && <div><ProfileUploadImg post={post} onClose={onClose} setStep={setStep} /></div>}
                {step === 3 && <div>{post === null && <ImagesUploadSection post={post} setStep={setStep} onClose={onClose} />}
                </div>}
                {step === 4 && <div><PostSpecsStep onClose={onClose} setStep={setStep} step={step} /></div>}
                {step === 5 && <div><AddOnsStep onClose={onClose} setStep={setStep} step={step} /></div>}
            </div>
        </div>
    );
};

export default Stepper;
