import { privateAxios } from "../../config/axios.config";


export const RequestsApi = {
    getRequests: () => privateAxios.get(`/v1/qarsrequests`),
    getUserRequests: (userName) => privateAxios.get(`/v1/QarsRequests/by-user/${userName}`),
}