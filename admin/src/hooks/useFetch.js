"use client";

import { useState, useEffect, useCallback } from "react";

export const useFetch = (fetcher, deps = []) => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetcher();
      setData(response.data.data);
      setMeta(response.data.meta ?? null);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, meta, isLoading, error, refetch: load };
};
