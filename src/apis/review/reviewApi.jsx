import { axiosInstance } from "@/apis/axiosInstance";

export const fetchPlaceReviews = async (placeId) => {
  try {
    const response = await axiosInstance.get(`/reviews/places/${placeId}`);
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const fetchPlaceDetails = async (placeId) => {
  try {
    const response = await axiosInstance.get(`/places/${placeId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
    const response = await axiosInstance.get("/members/profile");
    return response.data.data;
  };
  
export const toggleReviewLike = async (placeId, reviewId, isLiked) => {
    if (isLiked) {
      await axiosInstance.delete(`/reviews/likes/${placeId}/and/${reviewId}`);
    } else {
      await axiosInstance.post(`/reviews/likes/${placeId}/and/${reviewId}`);
    }
  };
  
export const deleteReview = async (reviewId) => {
    const response = await axiosInstance.delete(`/reviews/${reviewId}`);
    return response.data;
  };

export const fetchReviewDetail = async (placeId, reviewId) => {
    const response = await axiosInstance.get(`/reviews/${placeId}/and/${reviewId}`);
    return response.data.data;
  };

  export const createReview = async (placeId, formData) => {
    const response = await axiosInstance.post(`/reviews/${placeId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };
  export const updateReview = async (reviewId, formData) => {
    const response = await axiosInstance.put(`/reviews/${reviewId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };