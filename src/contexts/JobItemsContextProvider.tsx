import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSearchQuery } from "../lib/hooks";
import { JobItem, TDirection, TSortType } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchTextContext } from "./SearchTextContextProvider";
type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

type JobItemsContext = {
  isLoading: boolean;
  sortBy: TSortType;
  jobItems: JobItem[] | undefined;
  jobItemsSliced: JobItem[];
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  handleChangePage: (direction: TDirection) => void;
  handleChangeSortBy: (newSortBy: TSortType) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);
const JobItemsContextProvider = ({
  children,
}: JobItemsContextProviderProps) => {
  // Dependency on SearchTextContextProvider
  const { debouncedSearchText } = useSearchTextContext();
  const [jobItems, isLoading] = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortType>("relevant");
  const jobItemsSorted = useMemo(
    () =>
      [...jobItems].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy],
  );
  const jobItemsSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE,
      ),
    [jobItemsSorted, currentPage],
  );
  const totalNumberOfResults = jobItems.length;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  const handleChangePage = useCallback((direction: TDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: TSortType) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);
  const contextValue = useMemo(
    () => ({
      isLoading,
      sortBy,
      jobItems,
      jobItemsSliced,
      currentPage,
      totalNumberOfPages,
      totalNumberOfResults,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      isLoading,
      sortBy,
      jobItems,
      jobItemsSliced,
      currentPage,
      totalNumberOfPages,
      totalNumberOfResults,
      handleChangePage,
      handleChangeSortBy,
    ],
  );
  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
};

export default JobItemsContextProvider;

export const useJobItemsContext = () => {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useContext(JobItemsContext) must be within a JobItemsContextProvider",
    );
  }
  return context;
};
