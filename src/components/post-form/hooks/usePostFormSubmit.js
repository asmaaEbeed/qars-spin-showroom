import { toast } from "react-toastify";
import { managementAPI } from "../../../services/api";
import { usePosts } from "../../../context/PostsContext";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";

export function usePostFormSubmit({
  post,
  fetchPosts,
  fetchCarProfile,
  code,
  onClose,
}) {
  const { setPostCreatedId, setPostCreatedCode, onSendToReview } = usePosts();
  const { user } = useAuth();
  const { id } = useParams();
  console.log("from hook usepostform", id)
  const handleSubmit = async (e, formData, validateForm, setIsSubmitting) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
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
        else fetchPosts({ partnerId: (user.partnerId || id) });
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
          partnerId: user.partnerId || id,
        };
        const response = await managementAPI.postCreateRequest(params, body);
        // In case of publish action, send post to review
        if (action === "publish") {
          const responseReview = await onSendToReview({
            UserName: user.userName,
            Post_ID: response.data.postId,
          });
          if (responseReview.Code === "OK") {
            toast.success(responseReview.Desc);
          } else if (responseReview.Code !== "CANCELLED") {
            toast.error("Failed to send post to review");
          }
        }
        fetchPosts({ partnerId: user.partnerId || id });
        setPostCreatedId(response.data.postId);

        setPostCreatedCode(response.data.postCode);
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
