import { privateAxios } from "../../config/axios.config";

export const AdminPartnerAPI = {
    createNewPartner: (data) => privateAxios.post(`/v1/admin/Partners/CreatePartner`, data),
    getAllShowRooms: () => privateAxios.get(`/v1/admin/AdminforShowrooms/GetAllShowrooms`),
    editShowRoomStatus: (id, data) => privateAxios.put(`/v1/admin/Partners/UpdatePartnerStatus/${id}/status`, data),
    addParnerUser: (body) => privateAxios.post(`/v1/admin/PartnerUsers`, body),
    editPartnerFeature: (body) => privateAxios.put(`/v1/admin/Partners/mark-Partner-featured`, body),
    getPartnerUsers: (id) => privateAxios.get(`/v1/admin/PartnerUsers/GetUsers-by-partner/${id}`),
    editPartnerUserStatus: (body) => privateAxios.post(`/v1/admin/PartnerUsers/modify-status`, body)
}
