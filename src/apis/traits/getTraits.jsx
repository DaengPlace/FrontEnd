import { axiosInstance as axios } from "@/apis/axiosInstance";

export const getTraitsByPetId = async (petId) => {
  const response = await axios.get('/traits/');
  return response.data;
};

export const getPetQuestions = async () => {
  const response = await axios.get("/traits/questions?target=Pet");
  return response.data;
}

export const getUserQuestions = async () => {
  const response = await axios.get("/traits/questions?target=Member");
  return response.data;
}