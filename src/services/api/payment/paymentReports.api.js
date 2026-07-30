import { privateAxios } from "../../config/axios.config";

export const PaymentReportApi = {
  getPaymentReport: (params = {}) =>
    privateAxios.get("/Payment/GetPayments", { params }),
};