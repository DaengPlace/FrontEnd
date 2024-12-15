import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getPets = async () => {
  const response = await axios.get(`/member/pets`);
  return response.data;
};
