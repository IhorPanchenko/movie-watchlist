import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../../api/movieApi";
import { addMovieToWatchlist } from "../redux/movieSlice";
import SearchInput from "./SearchInput";
import MovieCard from "./MovieCard";
import UpcomingMovies from "./UpcomingMovies";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const dispatch = useDispatch();
  const { watchlist, movies, loading, error } = useSelector(
    (state) => state.movies
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        dispatch(fetchMovies(searchTerm));
        setHasSearched(true);
      }
    },
    [dispatch, searchTerm]
  );

  const handleAddToWatchlist = useCallback(
    (movie) => {
      const isInWatchlist = watchlist.some(
        (item) => item.imdbID === movie.imdbID
      );

      if (!isInWatchlist) {
        dispatch(addMovieToWatchlist(movie));
      } else {
        alert("This movie is already in your watchlist.");
      }
    },
    [dispatch, watchlist]
  );

  return (
    <div>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        loading={loading}
      />

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}
      {/* <UpcomingMovies /> */}

      {/* {!loading && !hasSearched && movies.length === 0 && <h2>Search Results</h2> */}
      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddToWatchlist={handleAddToWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
