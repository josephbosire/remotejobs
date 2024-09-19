import { useJobItemsContext } from "../contexts/JobItemsContextProvider";
import JobList from "./JobList";

const JobListSearch = () => {
  const { jobItemsSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSliced} isLoading={isLoading} />;
};

export default JobListSearch;
