import { privateAxios } from "../../../config/axios.config";

export const carsManagementApi = {
  createCarMake: (data) => {
    return privateAxios.post(`VehicleManagement/make`, data);
  },
  deleteCarMake: (id) => {
    return privateAxios.delete(`VehicleManagement/make/${id}`);
  },
};
