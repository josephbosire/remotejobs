type SearchFormProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};
const SearchForm = ({ searchText, setSearchText }: SearchFormProps) => {
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
          setSearchText(e.target.value);
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
