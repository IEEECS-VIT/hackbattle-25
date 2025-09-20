"use client";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

// Attach Authorization token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
  
        if (typeof window !== "undefined") {
          // Show toast
          window.dispatchEvent(new CustomEvent("showToast", { detail: { text: "Session Expired. Please login again." } }));

  
          // Longer delay to ensure toast is visible
          setTimeout(() => {
            window.location.href = "/";
          }, 2500);
        }
      }
      return Promise.reject(error);
    }
  );

export default apiClient;
