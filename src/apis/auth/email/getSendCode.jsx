import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const getSendCode = async (email) => {
  const response = await axios.get(`${BASE_URL}/email/send-code`, {
    email,
  });

  return response.data;
};
