import {  privateAxios } from '../config/axios.config';

export const superAdminAPI = {
    getAllShowRooms: () => privateAxios.get(`/v1/admin/AdminforShowrooms`),
    postChangeStatus: (data) => privateAxios.post(`/v1/CarForSaleManagement/change-status`, data),
    edit360Link: (param) => privateAxios.put(`/v1/admin/AdminforShowrooms/${param.postId}/view360-link?View360Link=${param.view360Link}`),
}