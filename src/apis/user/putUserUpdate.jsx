import { axiosInstance as axios } from "@/apis/axiosInstance";

export const putUserUpdate = async (formData) => {
  const response = await axios.put(`/members/profile`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
