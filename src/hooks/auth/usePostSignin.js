"use client";

import { useState } from "react";
import { postSignin } from "@/apis/auth/postSignin";

export const usePostSignin = () => {
  const [data, setData] = useState(null);

  const postSigninHandler = async (formData) => {

    try {
      const responseData = await postSignin(formData);
      setData(responseData);
    } catch (err) {
      setError(err);
    } 
  };

  return {
    postSignin: postSigninHandler,
    data,
  };
};
