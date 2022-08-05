import axios from "@utils/axiosClient";
import { endpoints } from "@constants/index";

const userServices = {
  /**
   *
   * @param {{ startIndex: number, limit: number, keyword: string, _id[nin]: string | string[]}} params
   * @returns
   */
  getAllUser: (params) => {
    return axios.get(endpoints.userGetInfo, { params });
  },

  /**
   *
   * @param {id: string}
   * @returns
   */
  getUserById: (id) => {
    return axios.get(`${endpoints.userGetInfo}/${id}`);
  },
};

export default userServices;
