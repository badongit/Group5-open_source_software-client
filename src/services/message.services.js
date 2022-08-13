import axios from "@utils/axiosClient";
import { endpoints } from "@constants/index";

const messageServices = {
	/**
   *
   * @param {{ startIndex: number, limit: number, fileType: string}} params
   * @returns
   */
  getMessages: (conversationId, params) => {
    return axios.get(`${endpoints.conversations}/${conversationId}${endpoints.messagesGet}`, { params });
  }
};

export default messageServices;
