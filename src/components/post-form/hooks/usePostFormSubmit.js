import { toast } from "react-toastify";
import {  managementAPI } from "../../../services/api";
import { usePosts } from "../../../context/PostsContext";

export function usePostFormSubmit({ post, fetchPosts, fetchCarProfile, code, onClose }) {
  const { setPostCreatedId, setPostCreatedCode } = usePosts();
  const handleSubmit = async (e, formData, validateForm, setIsSubmitting) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      if (post) {
        // update post
        const { images, imagesFiles, ...dataPrepare } = formData;
        const body = {
          ...dataPrepare,
          warrantyIsAvailable: Boolean(formData.warrantyIsAvailable),
          postId: post.postId,
        };
        await managementAPI.putUpdatePost(
          { createdBy: localStorage.getItem("userName") },
          body
        );
        onClose();
        if (code) fetchCarProfile(code);
        else fetchPosts({ partnerId: localStorage.getItem("partnerId") });
        toast.success("Post updated successfully");
      } else {
        // create post
        const { ...dataPrepare } = formData;
        // const { images, imagesFiles, ...dataPrepare } = formData;
        const body = {
          ...dataPrepare,
          CombinedModelNamePl: dataPrepare.carNamePl,
          warrantyIsAvailable: Boolean(formData.warrantyIsAvailable),
        };
        const params = {
          createdBy: localStorage.getItem("userName"),
          partnerId: localStorage.getItem("partnerId"),
        };
        const response = await managementAPI.postCreateRequest(params, body);
        fetchPosts({ partnerId: localStorage.getItem("partnerId")});
        setPostCreatedId(response.data.postId);
        
        setPostCreatedCode(response.data.postCode)
        toast.success("Post created successfully");
       
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit };
}
