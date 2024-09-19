import { createContext, useContext, useState } from "react";
import { useDebounce } from "../lib/hooks";
type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

type SearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);
const SearchTextContextProvider = ({
  children,
}: SearchTextContextProviderProps) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;

export const useSearchTextContext = () => {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useContext(SearchTextContext) must be within a SearchTextContextProvider",
    );
  }
  return context;
};
