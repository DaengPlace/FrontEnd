import { axiosInstance } from "@/apis/axiosInstance";

export const fetchPlaces = async (lat, lng, page, size, searchname = null) => {
  try {
    const response = await axiosInstance.get("/places", {
      params: {
        latitude: lat,
        longitude: lng,
        page,
        size,
      },
    });
    return response.data.data.places || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};
export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axiosInstance.get(`/places/${placeId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};