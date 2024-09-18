import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { API_URL } from "./constants";

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const jobItemsSliced = jobItems.slice(0, 7);
  const totalNumberOfResults = jobItems.length;
  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}?search=${searchText}`);
    const data = await response.json();
    setJobItems(data.jobItems);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!searchText) {
      return;
    }
    getData();
  }, [searchText]);
  return { jobItemsSliced, isLoading, totalNumberOfResults } as const;
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

export const useJobItem = (id: number | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>();
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    const fetchJobItem = async () => {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      setJobItem(data.jobItem);
      setIsLoading(false);
    };
    fetchJobItem();
  }, [id]);
  return [jobItem, isLoading] as const;
};
