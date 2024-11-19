import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../../api/movieApi";
import { addMovieToWatchlist } from "../redux/movieSlice";
import SearchInput from "./SearchInput";
import MovieCard from "./MovieCard/MovieCard";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearchResult, setIsSearchResult] = useState(false);
  const dispatch = useDispatch();

  const { watchlist, movies, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies(""));
  }, [dispatch]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        dispatch(fetchMovies(searchTerm));
        setCurrentSearchTerm(searchTerm);
        setIsSearchResult(true);
        setSearchTerm("");
      } else {
        setIsSearchResult(false);
        setCurrentSearchTerm("");
        dispatch(fetchMovies(""));
      }
    },
    [dispatch, searchTerm]
  );

  const handleAddToWatchlist = useCallback(
    (movie) => {
      const isInWatchlist = watchlist.some((item) => item.id === movie.id);

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

      <h2 className="text-2xl font-bold my-6 dark:text-gray-200">
        {isSearchResult
          ? `Search Results: ${currentSearchTerm}`
          : "Upcoming Movies"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {!loading && movies.length > 0
          ? movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToWatchlist={handleAddToWatchlist}
              />
            ))
          : !loading && (
              <p className="text-center text-gray-500">
                {isSearchResult
                  ? "No search results found."
                  : "No upcoming movies available."}
              </p>
            )}
      </div>
    </div>
  );
};

export default MovieSearch;
