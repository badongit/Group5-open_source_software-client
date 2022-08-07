import axiosClient from "@utils/axiosClient";
import { endpoints } from "@constants/index";

const conversationServices = {
  uploadPhoto: (conversationId) => {
    return axiosClient.put(`${endpoints.conversations}/${conversationId}/photo`);
	},
	changeRole: (conversationId) => {
    return axiosClient.put(`${endpoints.conversations}/${conversationId}/role`);
	},
};

export default conversationServices;
