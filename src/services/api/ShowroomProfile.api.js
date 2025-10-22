import { privateAxios } from "../config/axios.config";

export const ShowroomProfileAPI = {
  getDetails: (params) =>
    privateAxios.get(`/v1/QarsSpinProfile/${params}/details`),
  putContactInfo: (params, data) =>
    privateAxios.put(`/v1/QarsSpinProfile/${params}/contact-info`, data),
  putShowRoomDesc: (params, data) =>
    privateAxios.put(`/v1/QarsSpinProfile/${params}/description`, data),
  uploadLogo: (params, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    return privateAxios.post(
      `/v1/PartnersManagement/${params}/photos/logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  uploadBannerPl: (params, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    return privateAxios.post(
      `/v1/PartnersManagement/${params}/photos/banner-pl`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  uploadBannerSl: (params, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    return privateAxios.post(
      `/v1/PartnersManagement/${params}/photos/banner-sl`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  uploadGalleryImage: (params, imageFile) => {
    const formData = new FormData();
    imageFile.forEach((file) => {
      formData.append("files", file); // 👈 backend key must match API requirement
    });
    return privateAxios.post(
      `/v1/PartnersManagement/${params}/photos/gallery`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  getGalleryImages: (params) =>
    privateAxios.get(`/v1/PartnersManagement/${params}/photos/gallery`),
  deleteGalleryImage: (params) =>
    privateAxios.delete(
      `/v1/PartnersManagement/partners/${params.partnerId}/gallery/${params.imageId}`
    ),
};
