"use client";

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export async function postGoogleToken(google_accessToken) {
  try {
    const response = await axios.get(`${baseURL}/google/callback`, {
      headers: {
        Authorization: `Bearer ${google_accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login with Google: " + error);
  }
}

export default postGoogleToken;
