import { prepareQueryParams } from "../../utils/prepareQueryParams";
import { privateAxios } from "../config/axios.config";



export const managementAPI = {
  GetCars: (params) => {
    const keyMap = {
      partnerId: "PartnerId",
      PartnerId: "PartnerId",
      status: "Status",
      Status: "Status",
      searchType: "SearchType",
      SearchType: "SearchType",
      searchTerm: "SearchTerm",
      SearchTerm: "SearchTerm",
      pinToTop: "PinToTop",
    };

    const axiosParams = prepareQueryParams(params, keyMap);
    return privateAxios.get("/v1/CarForSaleManagement/GetCars", {
      params: axiosParams,
    });
  },

  postCreateRequest: (params, data) =>
    privateAxios.post(
      `/v1/CarForSaleManagement/CreateCarPost?createdBy=${params.createdBy}&partnerId=${params.partnerId}`,
      data
    ),
  getInitCarData: () => privateAxios.get("/v1/CarForSaleManagement/init-data"),
  putUpdatePost: (params, data) =>
    privateAxios.put(
      `/v1/CarForSaleManagement/UpdateCarForSale?updatedBy=${params.createdBy}`,
      data
    ),
  translate: (data) =>
    privateAxios.post("/v1/CarForSaleManagement/translate", data),
};
