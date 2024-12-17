import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postCheckDuplicateNickname = async (nickname) => {
  const response = await axios.post(`/check-duplicate-nick`, {
    nickname,
  });

  return response.data;
};
