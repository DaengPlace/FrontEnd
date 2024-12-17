import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getUserRecommend = async () => {
  const response = await axios.get(`/recommendations/`);
  return response.data;
};

export const getPetRecommend = async (petId) => {
  const response = await axios.get(`/recommendations/${petId}`);
  return response.data;
}