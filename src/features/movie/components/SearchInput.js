import PropTypes from "prop-types";

const SearchInput = ({ searchTerm, setSearchTerm, handleSearch, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("Please enter a movie title.");
      return;
    }
    handleSearch(e);
  };

  return (
    <form
      className="flex flex-col md:flex-row items-center justify-center mb-8"
      onSubmit={handleSubmit}
    >
      <label htmlFor="movie-search" className="sr-only">
        Search for a movie
      </label>
      <input
        id="movie-search"
        className="border border-gray-300 p-3 rounded-lg w-full md:w-auto flex-grow md:flex-grow-0 mb-4 md:mb-0"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search a movie"
        aria-label="Search for a movie"
      />
      <button
        className={`bg-blue-500 text-white p-3 rounded-lg w-full md:w-auto md:ml-4 transition-colors duration-300 ${
          loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchInput;
