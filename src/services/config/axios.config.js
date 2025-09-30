import axios from 'axios';


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const publicAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

privateAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


privateAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("partnerId");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("fullName");
        localStorage.removeItem("user");
        // ❌ can't call `useNavigate` here directly
        window.location.href = "/login"; // simple + reliable
      }
      return Promise.reject(error);
    }
  );