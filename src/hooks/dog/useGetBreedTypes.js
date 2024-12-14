"use client";

import { useState } from "react";
import { getBreedTypes } from "@/apis/dog/getBreedTypes";

export const useGetBreedTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchBreedTypes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const breedData = await getBreedTypes();
      setData(breedData.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchBreedTypes,
    isLoading,
    error,
    data,
  };
};
