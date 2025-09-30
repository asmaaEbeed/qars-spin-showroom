import { publicAxios, privateAxios } from "../config/axios.config";

export const authAPI = {
    login: (data) =>
      publicAxios.post(`/v1/auth/login`, data),
    me: () => privateAxios.get(`/v1/auth/me`),
}