import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postRegister = async (registerData) => {
  const { name, breed, birthDate, weight, gender, isNeutered } = registerData;

  const response = await axios.post(`/members/pets/register`, {
    name,
    breed,
    birthDate,
    weight,
    gender,
    isNeutered,
  });

  return response.data;
};
