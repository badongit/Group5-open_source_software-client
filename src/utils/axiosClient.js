import Axios from "axios";
import setAuthToken from "./setAuthToken";
import authServices from "@services/auth.services";
import { global, config } from "@constants/index";

const instance = Axios.create({
  baseURL: config.BASE_URL,
});

instance.interceptors.request.use((config) => {
  const accessToken = window.sessionStorage.getItem(global.ACCESS_TOKEN);
  if (accessToken) {
    config.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    if (response && response?.data) {
      return response.data;
    }
  },
  async function (error) {
    const { config } = error;
    const urlIgnore = [
      "/auth/token",
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/reset-password",
    ];

    const refreshToken =
      window.sessionStorage.getItem(global.REFRESH_TOKEN) ||
      localStorage.getItem(global.REFRESH_TOKEN);

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "jwt expired" &&
      (config.retry || 0) < 4 &&
      refreshToken &&
      !urlIgnore.includes(config.url)
    ) {
      config.retry = config.retry ? config.retry + 1 : 1;
      const getAccessToken = await authServices.refreshToken(refreshToken);
      const { accessToken } = getAccessToken.data;

      if (accessToken) {
        setAuthToken(accessToken);
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        if (window.sessionStorage.getItem(global.REFRESH_TOKEN)) {
          window.sessionStorage.setItem(global.ACCESS_TOKEN, accessToken);
        } else {
          localStorage.setItem(global.ACCESS_TOKEN, accessToken);
        }

        return instance(config);
      }
    }

    throw error.response.data;
  }
);

export default instance;
