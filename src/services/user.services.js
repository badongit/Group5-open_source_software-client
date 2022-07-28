import axios from "@utils/axios";
import { endpoints } from "@constants/index";

const userServices = {
  getAllUser: () => {
    return axios.get(endpoints.userGetInfo);
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
