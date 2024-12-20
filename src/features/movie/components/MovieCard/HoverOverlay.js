import React from "react";
import PropTypes from "prop-types";
import { FaInfoCircle, FaPlus, FaTrash } from "react-icons/fa";
import {
  formatDate,
  formatGenres,
  formatRuntime,
} from "../../../../utils/formatters";

const HoverOverlay = React.memo(
  ({
    releaseDate,
    genres,
    runtime,
    toggleModal,
    handleToggleWatchlist,
    isInWatchlist,
  }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 md:gap-4 text-xl md:text-base p-4 rounded-md bg-black bg-opacity-50 text-gray-200">
      <p>
        <span className="font-bold italic">{formatDate(releaseDate)}</span>
      </p>

      {/* Genres Display */}
      <div className="flex flex-wrap justify-center gap-2">
        {formatGenres(genres)}
      </div>

      {/* Runtime Display */}
      <p>{formatRuntime(runtime)}</p>

      {/* Action buttons for watchlist and movie details */}
      <div className="mt-4 flex gap-4">
        <button
          className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out ${
            isInWatchlist
              ? "bg-red-600 border border-red-400 hover:bg-red-700"
              : "bg-green-600 border border-green-400 hover:bg-green-700"
          }`}
          onClick={handleToggleWatchlist}
          aria-label={
            isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
          }
        >
          {isInWatchlist ? (
            <FaTrash className="text-2xl text-white" />
          ) : (
            <FaPlus className="text-2xl text-white" />
          )}
        </button>

        {/* Button to view movie details in modal */}
        <button
          className="bg-blue-600 text-white p-2 border border-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 ease-in-out"
          onClick={toggleModal}
        >
          <FaInfoCircle className="text-2xl text-gray-300" />
        </button>
      </div>
    </div>
  )
);

HoverOverlay.propTypes = {
  releaseDate: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  runtime: PropTypes.number,
  toggleModal: PropTypes.func.isRequired,
  handleToggleWatchlist: PropTypes.func.isRequired,
  isInWatchlist: PropTypes.bool.isRequired,
};

export default HoverOverlay;
