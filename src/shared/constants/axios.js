import axios from "axios";

export const AxiosInstance = () => {
  const axiosApiRequest = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
  });

  axiosApiRequest.interceptors.request.use(
    (request) => {
      const authenticatedUser = JSON.parse(localStorage.getItem("authUser"));

      request.headers["Accept"] = "application/json";
      request.headers["Accept-language"] = "nl";
      request.headers[
        "Authorization"
      ] = `Bearer ${authenticatedUser.accesstoken}`;

      return request;
    },
    (error) => Promise.reject(error)
  );

  axiosApiRequest.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return axiosApiRequest;
};
