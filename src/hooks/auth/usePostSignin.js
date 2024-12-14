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
    } catch (err) {
      setError(err);
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
