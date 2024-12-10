"use client";

import postGoogleToken from "@/apis/auth/postGoogleToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const GoogleLogin = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  useEffect(() => {
    const getToken = async () => {
      const AUTHORIZATION_CODE = new URL(window.location.href).searchParams.get(
        "code"
      );
      if (!AUTHORIZATION_CODE) {
        console.error("Authorization Code is missing");
        return;
      }

      try {
        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append(
          "client_secret",
          process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        );
        params.append("redirect_uri", REDIRECT_URI);
        params.append("code", AUTHORIZATION_CODE);

        const response = await axios.post(
          `https://oauth2.googleapis.com`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const google_accessToken = response.data.access_token;
        const data = await postGoogleToken(google_accessToken);

        if (data.accessToken) {
          router.push("/signin");

          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        }
      } catch (error) {
        console.error("Failed to process Google login:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };
    getToken();
  }, []);

  return null;
};

export default GoogleLogin;
