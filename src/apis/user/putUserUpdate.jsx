import { axiosInstance as axios } from "@/apis/axiosInstance";

export const updatePets = async (updatedData) => {
  const response = await axios.put(`/members/profile`, {
    updatedData,
  });
  return response.data;
};
