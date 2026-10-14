export default function SearchBar({ searchText, setSearchText, onSearch }) {
  return (
    <>
      <form className="search-box" onSubmit={e => {
        e.preventDefault();
        onSearch(searchText.trim() || "space");
      }}>
        <span>⌕</span>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search Mars, galaxies, astronauts..."
          aria-label="Search NASA images"
        />
        <button>Explore</button>
      </form>

      <div className="quick-searches">
        {["Mars", "Earth", "Galaxy", "Nebula", "Moon"].map(term =>
          <button key={term} type="button" onClick={() => setSearchText(term)}>
            {term}
          </button>
        )}
      </div>
    </>
  );
}