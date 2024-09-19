import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();
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
