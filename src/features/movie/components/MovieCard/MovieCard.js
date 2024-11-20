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
import { truncateText, formatRating } from "../../../../utils/formatters";

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
      className="mx-auto flex w-[85%] flex-col rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image for the movie poster */}
      <div className="relative h-0 w-full pb-[100%] sm:pb-[150%]">
        <img
          className={`absolute inset-0 h-full w-full rounded-md object-cover transition-opacity duration-300 ease-in-out ${
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
      <div className="mt-4 flex items-center justify-between text-gray-800 dark:text-gray-200">
        <h3 className="text-xl font-semibold">{truncateText(title, 15)}</h3>
        <span>{formatRating(vote_average)}</span>
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
