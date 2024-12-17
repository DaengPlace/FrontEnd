import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postCheckDuplicateNickname = async (nickname) => {
  const response = await axios.post(`/members/check-duplicate-nickname`, {
    nickname,
  });

  return response.data;
};
