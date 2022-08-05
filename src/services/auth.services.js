import axios from "@utils/axiosClient";
import { endpoints } from "@constants/index";

const authServices = {
  /**
   *
   * @param {{ username: string, password: string, remember: boolean}} param0
   * @returns
   */
  login: ({ username, password, remember }) => {
    return axios.post(endpoints.authLogin, { username, password, remember });
  },

  /**
   *
   * @param {{ username: string, password: string, email: string}} param0
   * @returns
   */
  register: ({ username, password, email }) => {
    return axios.post(endpoints.authRegister, { username, password, email });
  },

  /**
   *
   * @param {string} refreshToken
   * @returns
   */
  refreshToken: (refreshToken) => {
    return axios.post(endpoints.authRefreshToken, { refreshToken });
  },

  getProfile: () => {
    return axios.get(endpoints.authGetProfile);
  },

  logout: () => {
    return axios.get(endpoints.authLogout);
  },

  /**
   *
   * @param {{email: string}} param0
   * @returns
   */
  forgotPassword: ({ email }) => {
    return axios.post(endpoints.authForgotPassword, { email });
  },

  /**
   *
   * @param {{displayname: string, email: string}} param0
   * @returns
   */
  updateProfile: ({ displayname, email }) => {
    return axios.put(endpoints.authUpdateProfile, { displayname, email });
  },

  /**
   *
   * @param {{newPassword: string, oldPassword: string}} param0
   * @returns
   */
  changePassword: ({ oldPassword, newPassword }) => {
    return axios.put(endpoints.authChangePassword, {
      oldPassword,
      newPassword,
    });
  },
};

export default authServices;
