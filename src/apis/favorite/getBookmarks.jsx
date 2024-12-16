import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getBookmarks = async () => {
  const response = await axios.get('/favorite');
  return response.data;
};
