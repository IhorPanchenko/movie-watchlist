import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../../api/movieApi";
import { addMovieToWatchlist } from "../redux/movieSlice";
import SearchInput from "./SearchInput";
import MovieCard from "./MovieCard/MovieCard";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { watchlist, movies, loading, error } = useSelector(
    (state) => state.movies
  );

  const queryTerm = searchParams.get("search");

  useEffect(() => {
    if (queryTerm) {
      dispatch(fetchMovies(queryTerm));
    } else {
      dispatch(fetchMovies(""));
    }
  }, [dispatch, queryTerm]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        setSearchParams({ search: searchTerm });
        setSearchTerm("");
      } else {
        setSearchParams({});
      }
    },
    [searchTerm, setSearchParams]
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
      {/* Search Input */}
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        loading={loading}
      />

      {/* Loading and Error Messages */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Results Heading */}
      <h2 className="my-6 text-2xl font-bold dark:text-gray-200">
        {queryTerm ? `Search Results: ${queryTerm}` : "Upcoming Movies"}
      </h2>

      {/* Movie Grid */}
      <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                {queryTerm
                  ? "No search results found."
                  : "No upcoming movies available."}
              </p>
            )}
      </div>
    </div>
  );
};

export default MovieSearch;
