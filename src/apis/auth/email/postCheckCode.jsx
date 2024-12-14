import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postCheckCode = async (email, code) => {
  const response = await axios.post(`/email/check-code`, {
    email,
    code,
  });

  return response.data;
};
