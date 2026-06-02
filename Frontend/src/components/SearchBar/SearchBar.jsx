import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search place..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;