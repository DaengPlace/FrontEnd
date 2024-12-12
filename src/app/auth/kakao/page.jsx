"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const KakaoLogin = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  useEffect(() => {
    const sendAuthCodeToBackend = async () => {
      const AUTHORIZATION_CODE = new URL(window.location.href).searchParams.get(
        "code"
      );
      if (!AUTHORIZATION_CODE) {
        console.error("Authorization Code is missing");
        return;
      }
      console.log("AUTHORIZATION_CODE", AUTHORIZATION_CODE);

      try {
        const response = await axios.get(
          `${BASE_URL}/login/oauth2/code/kakao?code=${AUTHORIZATION_CODE}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        console.log("Response: ", response.data);
      } catch (error) {
        console.error("Error: ", error.response?.data || error.message);
      }
    };

    sendAuthCodeToBackend();
  }, []);

  return null;
};

export default KakaoLogin;
