import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getPopularFacilities = async () => {
  const response = await axios.get(`/places/popular`);
  return response.data;
};

export const getGenderAgeFacilities = async () => {
  const response = await axios.get(`/places/gender-popular`);
  return response.data;
};