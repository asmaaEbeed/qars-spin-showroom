import { privateAxios, publicAxios } from "../../config/axios.config";


export const PaymentApi = {
    initiatePayment: (data) => privateAxios.post(`/Payment/initiate`, data),
    paymentExecute: (body) => publicAxios.post(`/Payment/execute`, body),
    getQarsServices: () => privateAxios.get("/v1/QarsRequests/Get-QarsServices")
}