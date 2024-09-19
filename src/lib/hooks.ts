import { useEffect, useState } from "react";
import { JobItemResponse, JobItemsResponse } from "./types";
import { API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleError } from "./utils";

const fetchJobItem = async (id: number): Promise<JobItemResponse> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};
const fetchJobItems = async (searchText: string): Promise<JobItemsResponse> => {
  const response = await fetch(`${API_URL}/?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};
export const useJobItem = (id: number | null) => {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    },
  );
  const jobItem = data?.jobItem;
  return [jobItem, isInitialLoading] as const;
};

export const useJobItems = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    },
  );
  const jobItems = data?.jobItems || [];
  return [jobItems, isInitialLoading] as const;
};

export const useActiveId = () => {
  const [activeJobItemId, setActiveJobItemId] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveJobItemId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return [activeJobItemId] as const;
};

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedvalue, setDeboundcedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDeboundcedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedvalue;
};
