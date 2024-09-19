import { forwardRef } from "react";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>,
    document.body,
  );
});

export default BookmarksPopover;
