import { useDispatch, useSelector } from "react-redux";
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
      <h2 className="my-6 text-2xl font-bold dark:text-gray-200">
        Your Watchlist
      </h2>
      {watchlist.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

export default Watchlist;
