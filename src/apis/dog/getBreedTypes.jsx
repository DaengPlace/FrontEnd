import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getBreedTypes = async () => {
  const response = await axios.get(`/member/pets/breed-types`);
  return response.data;
};
