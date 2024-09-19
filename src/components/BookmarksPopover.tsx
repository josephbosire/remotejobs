import { useBookmarksContext } from "../contexts/BookmarksContextProvider";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
}
