import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getPlacesByPlaceId = async (placeId) => {
  const response = await axios.get(`places/${placeId}`);
  console.log(response);
  return response.data;
};
