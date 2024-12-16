import { axiosInstance as axios } from "@/apis/axiosInstance";

export const putPetUpdate = async (petId, updatedData) => {
  const response = await axios.put(`/member/pets/${petId}`, updatedData);
  return response.data;
};
