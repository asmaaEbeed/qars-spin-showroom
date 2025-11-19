import {  privateAxios } from '../config/axios.config';

export const superAdminAPI = {
    getAllShowRooms: () => privateAxios.get(`/v1/admin/AdminforShowrooms/GetAllShowrooms`),
    postChangeStatus: (data) => privateAxios.post(`/v1/CarForSaleManagement/change-status`, data),
    edit360LinkForPost: (param) => privateAxios.put(`/v1/admin/AdminforShowrooms/${param.postId}/Update360link-Post?Post360Link=${param.view360Link}`),
    edit360LinkForShowroom: (param) => privateAxios.put(`/v1/admin/AdminforShowrooms/${param.partnerId}/Update360link-Partner?Partner360Link=${param.view360Link}`),
}

