import React from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const MovieDetailsModal = React.memo(
  ({
    movie: {
      title,
      release_date,
      runtime,
      vote_average,
      vote_count,
      poster_path,
      directors,
      actors,
      genres,
      overview,
      origin_country,
    },
    onClose,
    handleToggleWatchlist,
    isInWatchlist,
  }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50">
        <div className="bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-lg w-full max-w-[350px] xxs:max-w-[400px] laptop:max-w-3xl max-h-[800px] relative shadow-lg dark:border-gray-700">
          {/* Toggle Button */}
          <button
            onClick={handleToggleWatchlist}
            className={`absolute -top-4 right-7 flex items-center justify-center w-8 h-8 text-white rounded-full transition ${
              isInWatchlist
                ? "bg-red-600 hover:bg-red-700 border border-red-400"
                : "bg-green-600 hover:bg-green-700 border border-green-400"
            }`}
            aria-label={
              isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
            }
          >
            {isInWatchlist ? (
              <FaTrash className="text-sm" />
            ) : (
              <FaPlus className="text-sm" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-700 text-white border border-gray-400 transition hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            <FaTimes className="text-sm" />
          </button>

          {/* Movie Info Header */}
          <div className="flex lg:flex-row justify-between items-baseline mb-4">
            <div className="w-full lg:w-3/4">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h2>
              <div className="flex text-gray-600 dark:text-gray-400">
                {/* Only show the year */}
                <span>{release_date?.split("-")[0]}</span>{" "}
                <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>{runtime} mins</span>
                <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>{origin_country}</span>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="w-2/4 laptop:w-[40%] flex items-center justify-between mt-0 lg:mt-4 text-center text-gray-800 dark:text-gray-300">
              <div>
                <div className="text-sm laptop:text-base font-semibold">
                  User Score
                </div>
                <div className="text-xs laptop:text-sm">{vote_average}/10</div>
              </div>
              <div>
                <div className="text-sm laptop:text-base font-semibold">
                  Total Votes
                </div>
                <div className="text-xs laptop:text-sm">{vote_count}</div>
              </div>
            </div>
          </div>

          {/* Movie Content */}
          <div className="flex flex-col laptop:flex-row">
            {/* Poster */}
            <div className="relative w-[90%] lg:w-[35%] h-[350px] mx-auto mb-4 hidden xxs:block laptop:mb-0">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-md shadow-md"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={`${title} poster`}
              />
            </div>

            {/* Movie Details */}
            <div className="flex flex-col w-full lg:w-2/3 ml-0 laptop:ml-4 lg:pl-3 text-gray-700 dark:text-gray-300">
              {/* Genres */}
              <div className="flex flex-wrap justify-center laptop:justify-start gap-2 mb-4">
                {genres
                  ? genres.map((genre, index) => (
                      <span
                        key={index}
                        className="border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs md:text-sm"
                      >
                        {genre.name}
                      </span>
                    ))
                  : "N/A"}
              </div>

              {/* Overview */}
              <p className="text-sm laptop:text-base mb-3">
                {overview || "N/A"}
              </p>
              <p className="text-sm laptop:text-base mb-2">
                <strong>Director{directors.length > 1 ? "s" : ""}:</strong>{" "}
                {directors?.join(", ") || "N/A"}
              </p>
              <p className="text-sm laptop:text-base mb-2">
                <strong>Cast: </strong> {actors?.join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MovieDetailsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleToggleWatchlist: PropTypes.func.isRequired,
  isInWatchlist: PropTypes.bool.isRequired,
};

export default MovieDetailsModal;
