import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FaPlus, FaInfoCircle, FaTrash } from "react-icons/fa";
import MovieDetailsModal from "./MovieDetailsModal";
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../redux/movieSlice";
import {
  formatDate,
  formatRuntime,
  truncateText,
} from "../../../utils/formatters";

const MovieCard = React.memo(({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchlist);
  const { title, release_date, poster_path, runtime, genres, vote_average } =
    movie;

  const isInWatchlist = useMemo(
    () => watchlist.some((item) => item.id === movie.id),
    [watchlist, movie.id]
  );

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleToggleWatchlist = useCallback(() => {
    if (isInWatchlist) {
      dispatch(removeMovieFromWatchlist(movie.id));
      toast.error(`${title} has been removed from your watchlist!`);
    } else {
      dispatch(addMovieToWatchlist(movie));
      toast.success(`${title} has been added to your watchlist!`);
    }
  }, [dispatch, isInWatchlist, movie, title]);

  const truncateOverview = (overview, maxLength = 150) => {
    if (overview && overview.length > maxLength) {
      return overview.substring(0, maxLength) + "...";
    }
    return overview;
  };

  return (
    <div
      className="flex flex-col border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image for the movie poster */}
      <div className="relative w-full h-0 pb-[100%] sm:pb-[150%]">
        <img
          className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-50" : "opacity-100"
          }`}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={`${title} poster`}
        />

        {/* Hover overlay with movie details */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-md p-4 bg-black bg-opacity-50 text-center text-gray-200">
            <p>
              <span className="font-bold italic">
                {formatDate(release_date)}
              </span>
            </p>

            <div className="flex flex-wrap gap-2 my-3">
              {genres
                ? genres.slice(0, 2).map((genre) => (
                    <span
                      key={genre.name}
                      className="border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 p-1 rounded-full text-xs md:text-sm"
                    >
                      {genre.name}
                    </span>
                  ))
                : "N/A"}
            </div>

            <p className="">{formatRuntime(runtime)}</p>

            <div className="mt-4 flex gap-4">
              {/* Button to toggle watchlist status */}
              <button
                className={`flex items-center justify-center p-2 rounded-full transition ${
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

              {/* Button to view more details about the movie */}
              <button
                className="bg-blue-600 text-white p-2 border border-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
                onClick={toggleModal}
              >
                <FaInfoCircle className="text-2xl text-gray-300" />
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <MovieDetailsModal
            movie={movie}
            handleToggleWatchlist={handleToggleWatchlist}
            onClose={toggleModal}
            isInWatchlist={isInWatchlist}
          />
        )}
      </div>

      {/* Movie title */}
      <div className="mt-4 flex justify-between items-center text-gray-800 dark:text-gray-200">
        <h3 className="font-semibold text-xl">{truncateText(title, 15)}</h3>
        <span>{vote_average} / 10</span>
      </div>
    </div>
  );
});

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
