import { axiosInstance as axios } from "@/apis/axiosInstance";

export const postProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`/members/profile/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.profileImageUrl;
  } catch (error) {
    console.error("이미지 업로드 중 오류:", error.response || error.message);
    throw error;
  }
};
