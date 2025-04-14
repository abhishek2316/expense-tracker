import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
    baseURL : BASE_URL,
    timeout : 10000,
    headers : {
        "Content-Type": "application/json",
        Accept :"application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          // Don't redirect immediately - maybe just log out or trigger context update
          console.warn("Unauthorized! Redirecting...");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else if (error.response.status === 500) {
          console.error("Server Error. Please try again.");
        }
      } else if (error.code === "ECONNABORTED") {
        console.error("Request Timeout");
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;