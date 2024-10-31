import React from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const MovieDetailsModal = React.memo(
  ({
    movie: {
      Title,
      Year,
      Rated,
      Runtime,
      Metascore,
      imdbRating,
      Poster,
      Genre,
      Plot,
      Director,
      Writer,
      Actors,
      Country,
      Awards,
    },
    onClose,
    handleToggleWatchlist,
    isInWatchlist,
  }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50">
        <div className="bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-lg w-full max-w-[400px] sm:max-w-xl lg:max-w-3xl max-h-[800px] relative shadow-lg dark:border-gray-700">
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
                {Title}
              </h2>
              <div className="flex text-gray-600 dark:text-gray-400">
                <span>{Year}</span>
                <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>{Rated}</span>
                <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>{Runtime}</span>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="w-2/4 lg:w-1/4 flex items-center justify-between mt-0 lg:mt-4 text-center text-gray-800 dark:text-gray-300">
              <div>
                <div className="text-sm lg:text-base font-semibold">
                  Metascore
                </div>
                <div className="text-xs lg:text-sm">{Metascore}%</div>
              </div>
              <div>
                <div className="text-sm lg:text-base font-semibold">IMDb</div>
                <div className="text-xs lg:text-sm">{imdbRating}/10</div>
              </div>
            </div>
          </div>

          {/* Movie Content */}
          <div className="flex flex-col sm:flex-row">
            {/* Poster */}
            <div className="relative w-[350px] lg:w-1/3 h-[350px] mx-auto mb-4 sm:mb-0">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-md shadow-md"
                src={Poster}
                alt={`${Title} poster`}
              />
            </div>

            {/* Movie Details */}
            <div className="flex flex-col w-full lg:w-2/3 ml-0 sm:ml-4 lg:pl-6 text-gray-700 dark:text-gray-300">
              {/* Genres */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                {Genre
                  ? Genre.split(", ").map((genre, index) => (
                      <span
                        key={index}
                        className="border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs lg:text-sm"
                      >
                        {genre}
                      </span>
                    ))
                  : "N/A"}
              </div>

              {/* Additional Info */}
              <p className="text-sm lg:text-base mb-3">{Plot || "N/A"}</p>
              <p className="text-sm lg:text-base mb-2">
                <strong>Director:</strong> {Director || "N/A"}
              </p>
              <p className="text-sm lg:text-base mb-2">
                <strong>Writer:</strong> {Writer || "N/A"}
              </p>
              <p className="text-sm lg:text-base mb-2">
                <strong>Cast:</strong> {Actors || "N/A"}
              </p>
              <p className="text-sm lg:text-base mb-2">
                <strong>Country:</strong> {Country || "N/A"}
              </p>
              <p className="text-sm lg:text-base mb-2">
                <strong>Awards:</strong> {Awards || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MovieDetailsModal.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
    Rated: PropTypes.string,
    Runtime: PropTypes.string,
    Metascore: PropTypes.string,
    imdbRating: PropTypes.string,
    Poster: PropTypes.string,
    Genre: PropTypes.string,
    Plot: PropTypes.string,
    Director: PropTypes.string,
    Writer: PropTypes.string,
    Actors: PropTypes.string,
    Country: PropTypes.string,
    Awards: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  handleToggleWatchlist: PropTypes.func.isRequired,
  isInWatchlist: PropTypes.bool.isRequired,
};

export default MovieDetailsModal;
