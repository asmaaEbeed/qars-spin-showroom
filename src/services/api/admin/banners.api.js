import { prepareQueryParams } from "../../../utils/prepareQueryParams";
import { privateAxios } from "../../config/axios.config";

export const bannerAPI = {
  getBanners: (params) => {
    const keyMap = {
      bannerType: "BannerType",
      startDate: "StartDate",
      endDate: "EndDate",
      targetType: "TargetType",
      status: "Status",
    };
    const axiosParams = prepareQueryParams(params, keyMap);
    return privateAxios.get(`/v1/admin/Ads/GetBanners`, {
      params: axiosParams,
    });
  },
  uploadBigBannerPl: (id, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile); 
    
    return privateAxios.put(
      `/v1/admin/Ads/${id}/Uploadbanner-pl`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  uploadBigBannerSl: (id, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile); 
    return privateAxios.put(
      `/v1/admin/Ads/${id}/Uploadbanner-sl`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  createBigBanner: (data) => {
    return privateAxios.post(`/v1/admin/Ads/CreateBigBanner`, data);
  },
  editBigBanner: (id, data) => {
    return privateAxios.put(`/v1/admin/Ads/${id}/UpdateBigBanner`, data);
  },
  approveBanner: (id, status) => {
    return privateAxios.put(`/v1/admin/Ads/update-Bannerstatus?BannerID=${id}&BannerStatus=${status}`);
  },
};
