import { useEffect, useState } from "react";
import { JobItemExpanded, JobItemResponse, JobItemsResponse } from "./types";
import { API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
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
      onError: (error) => {
        console.log(error);
      },
    },
  );
  const jobItem = data?.jobItem;
  return [jobItem, isInitialLoading] as const;
};

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),

      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });
  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((item) => item !== undefined) as JobItemExpanded[];
  const isLoading = results.some((result) => result.isLoading);
  return [jobItems, isLoading] as const;
};

export const useSearchQuery = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items-search", searchText],
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

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)),
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
};

export const useOnClickOutside = (
  refs: React.RefObject<HTMLElement>[],
  handler: () => void,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
};
