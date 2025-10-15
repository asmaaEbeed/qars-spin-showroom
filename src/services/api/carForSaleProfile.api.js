import { privateAxios } from "../config/axios.config";
const url =
  "https://qarsspintest.smartvillageqatar.com/QarsSpinAPI/BrowsingRelatedApi.asmx";
export const carAPI = {
  getCarProfile: (params) =>
    privateAxios.get(`/v1/CarForSale/CarProfile?postCode=${params}`),
  getCarSpecs: (params) =>
    privateAxios.get(`/v1/CarForSale/specs?postCode=${params}`),
  getCarOffers: (params) =>
    privateAxios.get(`/v1/CarForSale/offers?postCode=${params}`),
  getCarPhotos: (params) =>
    privateAxios.get(`/v1/CarForSale/photos?postCode=${params}`),
  putCarSpecs: (params, data) =>
    privateAxios.put(`/v1/CarForSale/${params}/specs`, data),
  getCarRequests: (params) =>
    privateAxios.get(
      `/v1/CarForSale/GetRequests?postId=${params.postId}&RequestType=${params.RequestType}&RequestFrom=${params.RequestFrom}`
    ),
  putCarInfo: (params, data) =>
    privateAxios.put(`/v1/CarForSale/${params}/internal-info`, data),
  postCreateRequest: (params, data) =>
    privateAxios.post(`/v1/CarForSale/CreateRequest?createdBy=${params}`, data),
  postUploadGalleryImage: async (formData) => {
    try {
      const response = await fetch(`${url}/UploadPostGalleryPhoto`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Upload failed:", error);
      return error;
    }
  },
  postDeleteGalleryImg: async (mediaId) => {
    try {
      const response = await fetch(`${url}/DeleteGalleryImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `Media_ID=${mediaId}&Our_Secret=${process.env.REACT_APP_API_OUR_SECRET}`,
      });

      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Delete failed:", error);
      return error;
    }
  },
  postApprovalRequest: async (body) => {
    try {
      const response = await fetch(`${url}/RequestPostApproval`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `Post_ID=${body.Post_ID}&UserName=${body.UserName}&Our_Secret=${process.env.REACT_APP_API_OUR_SECRET}`,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Upload failed:", error);
      return error;
    }
  },
};
