import axiosClient from "@utils/axiosClient";
import { endpoints } from "@constants/index";

const conversationServices = {
  uploadPhoto: (conversationId, file) => {
    return axiosClient.put(`${endpoints.conversations}/${conversationId}/photo`, file);
	},
	changeRole: ({ conversationId, userId, role}) => {
		return axiosClient.put(`${endpoints.conversations}/${conversationId}/role`, { userId, role });
	},
};

export default conversationServices;
