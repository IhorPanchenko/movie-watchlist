import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FaPlus, FaInfoCircle, FaTrash } from "react-icons/fa";
import MovieDetailsModal from "./MovieDetailsModal";
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../redux/movieSlice";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchlist);
  const isInWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID);
  const { Title, Year, Director, Actors, Poster } = movie;

  const handleDetailsClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
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
      className="flex flex-col border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image for the movie poster */}
      <div className="relative w-full h-0 pb-[150%]">
        <img
          className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-50" : "opacity-100"
          }`}
          src={Poster}
          alt={`${Title} poster`}
        />

        {/* Hover overlay with movie details */}
        {isHovered && (
          <div className="absolute inset-0 bg-black text-center bg-opacity-60 flex flex-col items-center justify-center rounded-md text-white p-4">
            <h2 className="text-xl font-semibold mb-4">{Title}</h2>
            <p className="text-base mb-2">
              <strong>Year:</strong> {Year}
            </p>
            <p className="text-base mb-2">
              <strong>Director:</strong> {Director || "N/A"}
            </p>
            <p className="text-base mb-4">
              <strong>Cast:</strong> {Actors || "N/A"}
            </p>

            <div className="flex space-x-2 mt-4">
              {/* Button to toggle watchlist status */}
              <button
                className={`p-2 rounded-full transition flex items-center justify-center ${
                  isInWatchlist
                    ? "bg-red-600 hover:bg-red-700 border border-red-400"
                    : "bg-green-600 hover:bg-green-700 border border-green-400"
                }`}
                onClick={handleToggleWatchlist}
                aria-label={
                  isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
                }
              >
                {/* Icon for adding/removing movie from watchlist */}
                {isInWatchlist ? (
                  <FaTrash className="text-white text-2xl" />
                ) : (
                  <FaPlus className="text-white text-2xl" />
                )}
              </button>

              {/* Button to view more details about the movie */}
              <button
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition flex items-center justify-center border border-blue-400"
                onClick={handleDetailsClick}
              >
                <FaInfoCircle className="text-gray-300 text-2xl" />
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <MovieDetailsModal
            movie={movie}
            handleToggleWatchlist={handleToggleWatchlist}
            onClose={handleCloseModal}
            isInWatchlist={isInWatchlist}
          />
        )}
      </div>
    </div>
  );
};

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
