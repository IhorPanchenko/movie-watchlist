import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard/MovieCard";
import { removeMovieFromWatchlist } from "../redux/movieSlice";
import { useCallback } from "react";

const Watchlist = () => {
  const { watchlist } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const handleRemoveFromWatchlist = useCallback(
    (id) => {
      dispatch(removeMovieFromWatchlist(id));
    },
    [dispatch]
  );

  return (
    <div>
      <h2 className="text-2xl font-bold my-6 dark:text-gray-200">
        Your Watchlist
      </h2>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              actionType="remove"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          No movies in your watchlist.
        </p>
      )}
    </div>
  );
};

Watchlist.propTypes = {
  watchlist: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default Watchlist;
