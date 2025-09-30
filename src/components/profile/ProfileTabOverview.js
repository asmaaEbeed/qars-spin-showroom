import React, { useState } from "react";
import ContactInfoCard from "./ContactInfoCard";
import DescriptionCard from "./DescriptionCard";
import BannersCard from "./BannersCard";
import { useProfile } from "../../context/ProfileContext";
import { ShowroomProfileAPI } from "../../services/api";

const ProfileTabOverview = ({ partner }) => {
  const { updateProfileData } = useProfile();
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [loading, setIsLoading] = useState(false)
  const [loadingDesc, setLoadingDesc] = useState(false)

  const [formData, setFormData] = useState({
    contactPhone: partner.contactPhone || "",
    contactWhatsApp: partner.contactWhatsApp || "",
    mapsUrl: partner.mapsUrl || "",
    notificationEmail: partner.notificationEmail || "",
  });

    const [formDataDesc, setFormDataDesc] = useState({
      descriptionEn: '',
      descriptionAr: ''
    });

  const handleEditContact = (formData) => {
    setIsEditingContact(true);
  };

  const handleSaveContact = async (formData) => {
    try {
      setIsLoading(true);
      await ShowroomProfileAPI.putContactInfo(partner.partnerId, formData);
      setIsEditingContact(false);
    } catch (error) {
      console.error("Failed to update contact:", error);
      setFormData(partner)
      // Handle error (e.g., show error toast)
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEditContact = () => {
    setIsEditingContact(false);
    setFormData(partner)
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescription = async (formData) => {
    try {
      setLoadingDesc(true);
      await ShowroomProfileAPI.putShowRoomDesc(partner.partnerId, {partnerDescPL: formData.descriptionEn, partnerDescSL: formData.descriptionAr});
      setIsEditingDescription(false);
      
    } catch (error) {
      console.error("Failed to update contact:", error);
      setFormDataDesc(partner)
      // Handle error (e.g., show error toast)
    } finally {
      setLoadingDesc(false);
    }
  };

  const handleCancelEditDescription = () => {
    setIsEditingDescription(false);
    setFormDataDesc(partner)
  };

  const handleBannerUpload = (type, file) => {
    try {
    

      // Simulate upload delay
      new Promise((resolve) => setTimeout(resolve, 1000));

      const bannerUrl = URL.createObjectURL(file);
      const updatedBanners = {
        ...partner.banners,
        [type]: bannerUrl,
      };

      updateProfileData({
        ...partner,
        banners: updatedBanners,
      });

      return bannerUrl;
    } catch (error) {
      console.error("Failed to upload banner:", error);
      throw error; // Re-throw to handle in the BannersCard component
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-3">
        <ContactInfoCard
          partner={partner}
          isEditing={isEditingContact}
          onEdit={handleEditContact}
          onSave={handleSaveContact}
          onCancel={handleCancelEditContact}
          loading={loading}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="lg:col-span-5">
        <DescriptionCard
          partner={partner}
          isEditing={isEditingDescription}
          onEdit={handleEditDescription}
          onSave={handleSaveDescription}
          onCancel={handleCancelEditDescription}
          loading={loadingDesc}
          formData={formDataDesc}
          setFormData={setFormDataDesc}
        />
      </div>
      <div className="lg:col-span-4">
        <BannersCard
          partner={partner}
          onUploadBanner={handleBannerUpload}
          isUploading={false} // You can manage this state if needed
        />
      </div>
    </div>
  );
};

export default ProfileTabOverview;
