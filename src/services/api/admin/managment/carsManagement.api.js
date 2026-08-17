import { privateAxios } from "../../../config/axios.config";

export const carsManagementApi = {
  createCarMake: (formData) =>
    privateAxios.post("VehicleManagement/make", formData),

  updateCarMake: (formData) => {
    const makeId = formData.get("makeId");

    return privateAxios.put(`VehicleManagement/make/${makeId}`, formData);
  },
  deleteCarMake: (id) => {
    return privateAxios.delete(`VehicleManagement/make/${id}`);
  },

  createCarClass: (data) => {
    return privateAxios.post("VehicleManagement/class", data);
  },
  updateCarClass: (data) => {
    return privateAxios.put(`VehicleManagement/class/${data.classId}`, data);
  },
  deleteCarClass: (id) => {
    return privateAxios.delete(`VehicleManagement/class/${id}`);
  },

  createCarModel: (data) => {
    return privateAxios.post("VehicleManagement/model", data);
  },
  updateCarModel: (data) => {
    return privateAxios.put(`VehicleManagement/model/${data.modelId}`, data);
  },
  deleteCarModel: (id) => {
    return privateAxios.delete(`VehicleManagement/model/${id}`);
  },
};
