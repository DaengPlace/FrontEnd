import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postLogout = async () => {
  
  await axios.post('/logout', {}, {withCredentials: true});
};
