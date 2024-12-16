import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getUserProfile = async () => {
  const response = await axios.get(`/members/profile`);
  return response.data;
};
