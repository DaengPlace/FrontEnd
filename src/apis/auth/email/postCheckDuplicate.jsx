import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postCheckDuplicate = async (email) => {
  const response = await axios.post(`/email/check-duplicate`, {
    email,
  });

  return response.data;
};
