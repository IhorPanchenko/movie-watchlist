import PropTypes from "prop-types";

const SortingControls = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const selectClass =
    "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded-lg";

  return (
    <fieldset className="flex items-center space-x-2 ml-6">
      <legend className="sr-only">Sorting Controls</legend>

      {/* Sort By Dropdown */}
      <label htmlFor="sortBy" className="text-gray-900 dark:text-gray-200">
        Sort by:
      </label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={selectClass}
      >
        <option value="date">Release Date</option>
        <option value="rating">Rating</option>
      </select>

      {/* Sort Order Dropdown */}
      <label htmlFor="sortOrder" className="text-gray-900 dark:text-gray-200">
        Order:
      </label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className={selectClass}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </fieldset>
  );
};

SortingControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default SortingControls;
