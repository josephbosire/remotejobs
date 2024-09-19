import { useSearchTextContext } from "../contexts/SearchTextContextProvider";

const SearchForm = () => {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          handleChangeSearchText(e.target.value);
          console.log(e.target.value);
        }}
        spellCheck="false"
        type="text"
        value={searchText}
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
};
export default SearchForm;
