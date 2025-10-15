import {  privateAxios } from '../config/axios.config';

export const superAdminAPI = {
    getAllShowRooms: () => privateAxios.get(`/v1/admin/AdminforShowrooms`),
    postChangeStatus: (data) => privateAxios.post(`/v1/CarForSaleManagement/change-status`, data),
}