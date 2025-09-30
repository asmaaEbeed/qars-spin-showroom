import {  privateAxios } from '../config/axios.config';

export const dashboardAPI = {
    getTopCounters: (params) => privateAxios.get(`/v1/partners/stats/TopCounters?partnerId=${params}`),
    getWidgets: (params) => privateAxios.get(`/v1/partners/stats/widgets?partnerId=${params}`),
    welcomeMessage: () => privateAxios.get(`/v1/partners/stats/welcome-message`),
    monthlyStats: (params) => privateAxios.get(`/v1/partners/stats/${params}/charts/monthly-stats`),
}