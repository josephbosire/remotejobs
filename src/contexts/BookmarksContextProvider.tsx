import { createContext, useContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemExpanded } from "../lib/types";
type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

type TBookmarksContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);
const BookmarksContextProvider = ({
  children,
}: BookmarksContextProviderProps) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    [],
  );
  const [bookmarkedJobItems, isLoading] = useJobItems(bookmarkedIds);
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContextProvider;

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useContext(BookmarksContext) must be within a BookmarksContextProvider",
    );
  }
  return context;
};
