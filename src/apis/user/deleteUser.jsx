import { axiosInstance as axios } from "@/apis/axiosInstance";

export const deleteUser = async () => {
  const response = await axios.delete('/members/profile');
  return response;
};
