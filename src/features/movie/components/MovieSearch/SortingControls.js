import PropTypes from "prop-types";

const SortingControls = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const selectClass =
    "p-2 border rounded-lg border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200";

  return (
    <fieldset className="mt-3 md:mt-0 md:ml-6 flex flex-col xxs:flex-row xxs:items-center xxs:space-x-2 xxs:space-y-0 space-y-2">
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
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
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
