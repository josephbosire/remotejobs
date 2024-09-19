import { forwardRef } from "react";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div ref={ref} className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
});

export default BookmarksPopover;
