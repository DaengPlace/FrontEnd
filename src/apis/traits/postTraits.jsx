import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postPetTraits = async (petId, {petTraitResponseRequestList: petTraits}) => {
  const response = await axios.put(`/traits/${petId}`, {petTraitResponseRequestList: petTraits});
  return response.data;
};

export const registerUserTraits = async ({memberTraitResponseRequestList: memberTraits }) => {
  const response = await axios.put(`/traits/register`, {memberTraitResponseRequestList: memberTraits });
  return response.data;
}
