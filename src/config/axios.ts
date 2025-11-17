import { toast } from "sonner";
import axios from "axios";
import { clearStorage } from "./localStorage";

export const BaseURL = import.meta.env.VITE_API_BASE_URL;

const axiosConfig = (token = "", contentType = "") => {
  const instance = axios.create({
    baseURL: BaseURL,
    headers: {
      Authorization: token ? "Bearer " + token : "",
      "Content-Type": contentType || "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        await clearStorage();
        toast.info("Please log in again.");
        window.location.replace("/");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosConfig;
