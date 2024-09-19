import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(BookmarksContext);
  return (
    <button
      className="bookmark-btn"
      onClick={(event) => {
        handleToggleBookmark(id);
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
