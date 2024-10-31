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

const MovieCard = React.memo(({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchlist);
  const { Title, Year, Director, Actors, Poster } = movie;

  const isInWatchlist = useMemo(
    () => watchlist.some((item) => item.imdbID === movie.imdbID),
    [watchlist, movie.imdbID]
  );

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleToggleWatchlist = useCallback(() => {
    if (isInWatchlist) {
      dispatch(removeMovieFromWatchlist(movie.imdbID));
      toast.error(`${Title} has been removed from your watchlist!`);
    } else {
      dispatch(addMovieToWatchlist(movie));
      toast.success(`${Title} has been added to your watchlist!`);
    }
  }, [dispatch, isInWatchlist, movie, Title]);

  return (
    <div
      className="flex flex-col border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image for the movie poster */}
      <div className="relative w-full h-0 pb-[100%] sm:pb-[150%]">
        <img
          className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-50" : "opacity-100"
          }`}
          src={Poster}
          alt={`${Title} poster`}
        />

        {/* Hover overlay with movie details */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md p-4 bg-black bg-opacity-60 dark:bg-gray-900 text-center text-white">
            <h2 className="mb-4 text-xl font-semibold">{Title}</h2>
            <p className="mb-2 text-base">
              <strong>Year:</strong> {Year}
            </p>
            <p className="mb-2 text-base">
              <strong>Director:</strong> {Director || "N/A"}
            </p>
            <p className="mb-4 text-base">
              <strong>Cast:</strong> {Actors || "N/A"}
            </p>

            <div className="mt-4 flex space-x-2">
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
                {/* Icon for adding/removing movie from watchlist */}
                {isInWatchlist ? (
                  <FaTrash className="text-2xl text-white" />
                ) : (
                  <FaPlus className="text-2xl text-white" />
                )}
              </button>

              {/* Button to view more details about the movie */}
              <button
                className="bg-blue-600 dark:bg-blue-500 text-white p-2 border border-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
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
    </div>
  );
});

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Director: PropTypes.string,
    Actors: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
