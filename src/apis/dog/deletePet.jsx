import { axiosInstance as axios } from "@/apis/axiosInstance";

export const deletePet = async (petId) => {
  const response = await axios.delete(`/member/pets/${petId}`);
  return response.data;
};
