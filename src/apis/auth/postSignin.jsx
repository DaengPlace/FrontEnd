import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postSignin = async (signinData) => {
  const {
    name,
    nickname,
    profileImageUrl,
    gender,
    state,
    city,
    birthDate,
    locationStatus,
    email,
  } = signinData;

  const response = await axios.post(`/members`, {
    name,
    nickname,
    profileImageUrl,
    gender,
    state,
    city,
    birthDate,
    locationStatus,
    email,
  });

  return response.data;
};
