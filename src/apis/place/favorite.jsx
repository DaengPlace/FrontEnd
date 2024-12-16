import { axiosInstance } from "@/apis/axiosInstance";

export const addFavorite = async (placeId) => {
  try {
    const response = await axiosInstance.put("/favorite", { placeId });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (placeId) => {
  try {
    const response = await axiosInstance.delete("/favorite", {
      data: { placeId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};
