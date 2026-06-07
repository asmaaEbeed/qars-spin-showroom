import { privateAxios } from "../../config/axios.config";

export const RequestsApi = {
  getRequests: () => privateAxios.get(`/v1/qarsrequests`),
  getUserRequests: (userName) =>
    privateAxios.get(`/v1/QarsRequests/by-user/${userName}`),
  updateRequestStatus: (id, status) =>
    privateAxios.put(
      `/v1/QarsRequests/UpdateRequestStatus?RequestID=${id}&Status=${status}`,
    ),
};
