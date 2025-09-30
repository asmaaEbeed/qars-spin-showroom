import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../context/PostsContext";
import { useCarContext } from "../../context/CarContext";

import BasicInfoSection from "./sections/BasicInfoSection";
import PriceSection from "./sections/PriceSection";
import MileageInfoSection from "./sections/MileageInfoSection";
import ColorSection from "./sections/ColorSection";

import { usePostForm } from "./hooks/usePostForm";
import { usePostFormSubmit } from "./hooks/usePostFormSubmit";
import TechDescriptionSection from "./sections/TechDescriptionSection";
import InternalInfo from "./sections/InternalInfo";

const PostForm = ({ onClose, post = null, setStep, step = 0 }) => {
  const {
    fetchPosts,
    fetchCarsName,
    carsNameList,
    postCreatedId,
    setPostCreatedId,
    setPostCreatedCode,
  } = usePosts();
  const { fetchCarProfile } = useCarContext();
  const { code } = useParams();

  const { formData, setFormData, errors, setErrors, validateForm, handleBlur } =
    usePostForm(post);
  const { handleSubmit } = usePostFormSubmit({
    post,
    fetchPosts,
    fetchCarProfile,
    code,
    onClose,
    
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (carsNameList.length === 0) fetchCarsName();
  }, [carsNameList, fetchCarsName]);

  // Move To next Step after Create new Post
  useEffect(() => {
    if (postCreatedId !== "" && step === 0) {
      onClose();
    } else if (postCreatedId !== "" && step === 1) {
      setStep(2);
    }
  }, [postCreatedId, setStep, step]);

  const handleClose = () => {
    onClose();
    step && setStep(1);
    setPostCreatedId("");
    setPostCreatedCode("");
  };

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(
          e,
          formData,
          validateForm,
          setIsSubmitting
          // setIsLoadingAddImg
        )
      }
      className="flex-1 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto p-4">
        <BasicInfoSection {...{ formData, setFormData, errors, handleBlur }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PriceSection {...{ formData, setFormData, errors, handleBlur }} />
          <MileageInfoSection
            {...{ formData, setFormData, errors, handleBlur }}
          />
        </div>
        <ColorSection {...{ formData, setFormData, errors, handleBlur }} />
        <TechDescriptionSection
          {...{ formData, setFormData, errors, handleBlur, setErrors }}
        />
        <InternalInfo {...{ formData, setFormData, errors, handleBlur }} />
      </div>

      <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isSubmitting
            ? post
              ? "Updating..."
              : "Creating..."
            : post
            ? "Update"
            : "Save & Next"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
