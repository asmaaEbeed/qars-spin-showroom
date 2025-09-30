import React, { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";
import { ShowroomProfileAPI } from "../services/api";

// Default profile data
const defaultProfileData = {
  partner: {
    logo: "",
    name: {
      primary: "Partner Name (Primary)",
      secondary: "Partner Name (Secondary)",
    },
    status: "Active",
    isFeatured: true,
    stats: {
      visits: 1250,
      activePosts: 23,
      followers: 89,
      rating: 4.5,
    },
    contact: {
      phone: "+1234567890",
      whatsapp: "+1234567890",
      location: "Doha, Qatar",
      email: "partner@example.com",
      mapsUrl: "#",
    },
    description: {
      primary:
        "We are a premium automotive dealer specializing in luxury and sports cars. With over 10 years of experience in the industry, we provide exceptional service and quality vehicles to our customers.",
      secondary:
        "نحن وكيل سيارات متميز متخصص في السيارات الفاخرة والرياضية. مع أكثر من 10 سنوات من الخبرة في الصناعة، نقدم خدمة استثنائية ومركبات عالية الجودة لعملائنا.",
    },
    banners: {
      primary: "",
      secondary: "",
    },
  },
};

// Create the context
const ProfileContext = createContext({
  profileData: defaultProfileData,
  updateProfileData: () => {},
  refreshProfileData: async () => {},
  loading: false,
  error: null,
});

// Create a provider component
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle logo upload and removal
  const uploadLogo = async (file) => {
    try {
      setLoading(true);

      if (file === null) {
        // Handle logo removal
        await updateProfileData({ logo: "" });
        return { success: true, url: "" };
      }

      // In a real app, you would upload the file to a server here
      // const formData = new FormData();
      // formData.append('logo', file);
      // const response = await api.uploadLogo(formData);

      // For demo, create a local URL for the uploaded file
      const logoUrl = URL.createObjectURL(file);

      // Update the profile with the new logo URL
      await updateProfileData({ logo: logoUrl });

      // Show success notification
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logo uploaded successfully",
        confirmButtonColor: "#4f46e5",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      return { success: true, url: logoUrl };
    } catch (err) {
      const errorMsg = "Failed to update logo: " + err.message;
      setError(errorMsg);

      // Show error notification
      await Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: errorMsg,
        confirmButtonColor: "#4f46e5",
      });

      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Function to update profile data
  const updateProfileData = async (params, data) => {
    try {
      setLoading(true);
      const response = await ShowroomProfileAPI.putContactInfo(params, data);
  
      // Update state with merged data (depends on your API response)
      setProfileData((prev) => ({
        ...prev,
        partner: {
          ...prev.partner,
          ...data, // merge the new fields
        },
      }));
  
      return response;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  

  // Function to refresh profile data
  const refreshProfileData = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch the latest data from the API
      // const data = await api.getProfile();
      // setProfileData(data);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        updateProfileData,
        refreshProfileData,
        uploadLogo,
        loading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export default ProfileContext;
