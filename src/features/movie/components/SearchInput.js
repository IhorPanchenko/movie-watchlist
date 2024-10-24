const SearchInput = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <form
      className="flex flex-col md:flex-row items-center justify-center mb-8"
      onSubmit={handleSearch}
    >
      <input
        className="border border-gray-300 p-3 rounded-lg w-full md:w-auto flex-grow md:flex-grow-0 mb-4 md:mb-0"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search a movie"
      />
      <button
        className="bg-blue-500 text-white p-3 rounded-lg w-full md:w-auto md:ml-4 transition-colors duration-300 hover:bg-blue-600"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
