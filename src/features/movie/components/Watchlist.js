import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { removeMovieFromWatchlist } from "../redux/movieSlice";

const Watchlist = () => {
  const { watchlist } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const handleRemoveFromWatchlist = (imdbID) => {
    dispatch(removeMovieFromWatchlist(imdbID));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-6 text-center">Your Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              actionType="remove"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
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
