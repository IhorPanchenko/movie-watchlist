import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import {
  formatRuntime,
  truncateText,
  formatVoteCount,
  formatGenres,
  formatCountry,
  formatRating,
} from "../../../utils/formatters";

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
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
        <div className="relative w-full max-w-[350px] xxs:max-w-[400px] laptop:max-w-3xl max-h-[800px] p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:border-gray-700">
          {/* Toggle Button */}
          <button
            onClick={handleToggleWatchlist}
            className={`absolute -top-4 right-7 flex items-center justify-center w-8 h-8 rounded-full border transition ${
              isInWatchlist
                ? "bg-red-600 hover:bg-red-700 border-red-400"
                : "bg-green-600 hover:bg-green-700 border-green-400"
            } text-white`}
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
            className="absolute -top-4 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-700 border border-gray-400 text-white transition hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            <FaTimes className="text-sm" />
          </button>

          {/* Movie Info Header */}
          <div className="mb-4 flex flex-col lg:flex-row justify-between items-baseline">
            <div className="w-full lg:w-3/4">
              <h2 className="mb-2 text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <div className="flex text-gray-600 dark:text-gray-400">
                {/* Only show the year */}
                <span>{release_date?.split("-")[0]}</span>
                <div className="my-auto mx-2 w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>{formatRuntime(runtime)}</span>
                <div className="my-auto mx-2 w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>{formatCountry(origin_country)}</span>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="mt-0 lg:mt-4 w-2/4 laptop:w-[20%] flex items-center justify-between text-center text-gray-800 dark:text-gray-300">
              <div>
                <div className="font-semibold text-sm laptop:text-base">
                  Score
                </div>
                <div className="text-xs laptop:text-sm">
                  {formatRating(vote_average)}
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm laptop:text-base">
                  Voters
                </div>
                <div className="text-xs laptop:text-sm">
                  {formatVoteCount(vote_count)}
                </div>
              </div>
            </div>
          </div>

          {/* Movie Content */}
          <div className="flex flex-col laptop:flex-row">
            {/* Poster */}
            <div className="relative w-[90%] laptop:w-1/3 h-[350px] mx-auto mb-4 laptop:mb-0 hidden xxs:block">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-md shadow-md"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={`${title} poster`}
              />
            </div>

            {/* Movie Details */}
            <div className="ml-0 laptop:ml-4 laptop:pl-3 flex flex-col w-full laptop:w-2/3 text-gray-700 dark:text-gray-300">
              {/* Genres */}
              <div className="mb-4 flex flex-wrap justify-center laptop:justify-start gap-2">
                {formatGenres(genres, 3)}
              </div>

              {/* Overview */}
              <p className="mb-3 text-sm laptop:text-base">
                {truncateText(overview, 460) || "N/A"}
              </p>
              <p className="mb-2 text-sm laptop:text-base">
                <strong>Director{directors.length > 1 ? "s" : ""}:</strong>{" "}
                {directors?.join(", ") || "N/A"}
              </p>
              <p className="mb-2 text-sm laptop:text-base">
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
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    runtime: PropTypes.number,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number,
    poster_path: PropTypes.string,
    directors: PropTypes.arrayOf(PropTypes.string),
    actors: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    overview: PropTypes.string,
    origin_country: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  handleToggleWatchlist: PropTypes.func.isRequired,
  isInWatchlist: PropTypes.bool.isRequired,
};

export default MovieDetailsModal;
