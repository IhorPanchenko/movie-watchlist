import { useDispatch, useSelector } from "react-redux";
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
      <h2>Your Watchlist</h2>
      {watchlist.length > 0 ? (
        <div>
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
        <p>No movies in your watchlist.</p>
      )}
    </div>
  );
};
export default Watchlist;
