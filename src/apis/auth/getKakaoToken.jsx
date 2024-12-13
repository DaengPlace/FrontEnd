"use client";

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export async function getKakaoToken(kakao_accessToken) {
  try {
    const response = await axios.get(
      `${baseURL}/login/oauth2/code/kakao?code=${kakao_accessToken}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to login with Kakao: " + error);
  }
}

export default getKakaoToken;
