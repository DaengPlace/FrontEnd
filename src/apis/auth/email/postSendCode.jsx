import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postSendCode = async (email) => {
  const response = await axios.post(`/email/send-code`, {
    email,
  });

  return response.data;
};
