const SortingControls = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <div className="flex items-center space-x-4 ml-6">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded-lg"
      >
        <option value="rating">Sort by Rating</option>
        <option value="date">Sort by Release Date</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded-lg"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortingControls;
