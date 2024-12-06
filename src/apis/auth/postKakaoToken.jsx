"use client";

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export async function postKakaoToken(kakao_accessToken) {
  try {
    const response = await axios.get(`${baseURL}/kakao/callback`, {
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`,
      },
    });
    return response.data.accessToken;
  } catch (error) {
    throw new Error("Failed to login with Kakao: " + error);
  }
}

export default postKakaoToken;
