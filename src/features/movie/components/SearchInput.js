import PropTypes from "prop-types";
import DarkModeToggle from "./DarkModeToggle";

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
    <div className="flex items-center mb-8 md:flex md:items-center md:justify-center">
      <form
        className="w-full flex flex-col md:flex-row items-center justify-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="movie-search" className="sr-only">
          Search for a movie
        </label>
        <input
          id="movie-search"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-3 rounded-lg w-full md:w-auto flex-grow md:flex-grow-0 mb-4 md:mb-0"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a movie"
          aria-label="Search for a movie"
        />
        <button
          className={`bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-900 p-3 rounded-lg w-full md:w-auto md:ml-4 transition-colors duration-300 ${
            loading
              ? "bg-blue-400 dark:bg-blue-500 cursor-not-allowed"
              : "hover:bg-blue-600 dark:hover:bg-blue-700"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <DarkModeToggle />
    </div>
  );
};

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchInput;
