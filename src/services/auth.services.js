import axiosClient from "@utils/axiosClient";
import { endpoints } from "@constants/index";

const authServices = {
  /**
   *
   * @param {{ username: string, password: string, remember: boolean}} param0
   * @returns
   */
  login: ({ username, password, remember }) => {
    return axiosClient.post(endpoints.authLogin, { username, password, remember });
  },

  /**
   *
   * @param {{ username: string, password: string, email: string}} param0
   * @returns
   */
  register: ({ username, password, email, displayname }) => {
    return axiosClient.post(endpoints.authRegister, { username, password, email, displayname });
  },

  /**
   *
   * @param {string} refreshToken
   * @returns
   */
  refreshToken: (refreshToken) => {
    return axiosClient.post(endpoints.authRefreshToken, { refreshToken });
  },

  getProfile: () => {
    return axiosClient.get(endpoints.authGetProfile);
  },

  logout: () => {
    return axiosClient.get(endpoints.authLogout);
  },

  /**
   *
   * @param {{email: string}} param0
   * @returns
   */
  forgotPassword: ({ email }) => {
    return axiosClient.post(endpoints.authForgotPassword, { email });
  },

  /**
   *
   * @param {{email: string}} param0
   * @returns
   */
  resetPassword: ({ token, password }) => {
    return axiosClient.post(`${endpoints.authResetPassword}/${token}`, { password });
  },

  /**
   *
   * @param {{dateOfBirth,displayname,gender}} param0
   * @returns
   */
  updateProfile: ({ dateOfBirth,displayname,gender, }) => {
    return axiosClient.put(endpoints.authUpdateProfile, { dateOfBirth,displayname,gender });
  },
  /**
   *
   * @param {{files}} param0
   * @returns
   */
   changeAvatar: ({ files }) => {
    return axiosClient.put(endpoints.authUploadAvatar, files);
  },
  /**
   *
   * @param {{newPassword: string, oldPassword: string}} param0
   * @returns
   */
  /**
   *
   * @param {{newPassword: string, oldPassword: string}} param0
   * @returns
   */
  changePassword: ({ oldPassword, newPassword }) => {
    return axiosClient.put(endpoints.authChangePassword, {
      oldPassword,
      newPassword,
    });
  },
};

export default authServices;
