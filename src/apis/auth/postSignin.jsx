import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postSignin = async (formData) => {
  const response = await axios.post(`/members`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
