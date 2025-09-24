"use client";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");

      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: { text: "Token expired. Please Login Again." },
        })
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // wait 2s so toast is visible
    }
    return Promise.reject(error);
  }
);

export default apiClient;
