import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getReviews = async () => {
  const response = await axios.get('/reviews');
  return response.data;
};
