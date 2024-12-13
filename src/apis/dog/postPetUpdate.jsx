import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postPetUpdate = async (petId, updateData) => {
  const response = await axios.post(`/member/pets/${petId}`, {
    updateData,
  });

  return response.data;
};
