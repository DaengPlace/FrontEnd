"use client";

import { useState } from "react";
import { postSignin } from "@/apis/auth/postSignin";

export const usePostSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postSigninHandler = async (signinData) => {
    setIsLoading(true);
    setError(null);

    try {
      const responseData = await postSignin(signinData);
      setData(responseData);
      alert("회원가입이 완료되었습니다!");
    } catch (err) {
      setError(err);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    postSignin: postSigninHandler,
    isLoading,
    error,
    data,
  };
};
