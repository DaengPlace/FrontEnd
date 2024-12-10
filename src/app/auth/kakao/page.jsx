"use client";

import postKakaoToken from "@/apis/auth/postKakaoToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const KakaoLogin = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

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
        params.append("grant_type", "authorization_code");
        params.append("client_id", REST_API_KEY);
        params.append("redirect_uri", REDIRECT_URI);
        params.append("code", AUTHORIZATION_CODE);

        const response = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const kakao_accessToken = response.data.access_token;
        console.log(kakao_accessToken);
        const data = await postKakaoToken(kakao_accessToken);
        console.log(data);

        if (data.accessToken) {
          router.push("/signin");

          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        }
      } catch (error) {
        console.error("Failed to process Kakao login:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };
    getToken();
  }, []);

  return null;
};

export default KakaoLogin;
