import { useEffect, useState } from "react";
import { useBannerContext } from "../../../context/BannerContext";

export function useBannerUpload(editingBanner, open, slot) {
  
  const { handleUploadConfirm, loadingUploadBigBanner } = useBannerContext();
  const [viewFile, setViewFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  // Preview selected file
  useEffect(() => {
    if (uploadFile) {
      const reader = new FileReader();
      reader.onload = () => setViewFile(reader.result);
      reader.readAsDataURL(uploadFile);
    }
  }, [uploadFile]);

  // Show current banner from the API when modal opens
  useEffect(() => {
    if (editingBanner && open) {
      setViewFile(
        slot === "pl"
          ? editingBanner.imageUrlPl
          : editingBanner.imageUrlSl
      );
    } else {
      setViewFile(null);
    }
  }, [editingBanner, open, slot]);

  // Upload handler
  const handleUpload = async (id) => {
    const res = await handleUploadConfirm(uploadFile, slot, id);
    return res;
  };

  //  Reset all states (good for closing modal)
  const reset = () => {
    setViewFile(null);
    setUploadFile(null);
  };

  return {
    viewFile,
    uploadFile,
    setUploadFile,
    loadingUploadBigBanner,
    handleUpload,
    reset,
  };
}
