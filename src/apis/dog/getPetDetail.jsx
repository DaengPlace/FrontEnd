import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getPetDetail = async (petId) => {
  const response = await axios.get(`/member/pets/${petId}`);
  return response.data;
};
