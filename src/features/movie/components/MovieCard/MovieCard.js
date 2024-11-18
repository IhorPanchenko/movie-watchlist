import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import HoverOverlay from "./HoverOverlay";
import MovieDetailsModal from "../MovieDetailsModal";
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../../redux/movieSlice";
import { truncateText } from "../../../../utils/formatters";

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

  return (
    <div
      className="flex flex-col mx-auto w-[85%] sm:w-full border rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700"
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
          <HoverOverlay
            releaseDate={release_date}
            genres={genres}
            runtime={runtime}
            toggleModal={toggleModal}
            handleToggleWatchlist={handleToggleWatchlist}
            isInWatchlist={isInWatchlist}
          />
        )}

        {/* Modal window with movie details */}
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
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    runtime: PropTypes.number,
    vote_average: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    origin_country: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default MovieCard;
