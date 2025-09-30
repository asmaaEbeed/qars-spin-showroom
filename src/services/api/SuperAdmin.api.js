import {  privateAxios } from '../config/axios.config';

export const superAdminAPI = {
    getAllShowRooms: () => privateAxios.get(`/v1/admin/AdminforShowrooms`),
}