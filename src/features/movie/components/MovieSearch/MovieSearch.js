import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../../../api/movieApi";
import { addMovieToWatchlist } from "../../redux/movieSlice";
import SearchInput from "./SearchInput";
import MovieCard from "../MovieCard/MovieCard";
import SortingControls from "./SortingControls";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
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

  const sortMovies = (movies) => {
    const sortedMovies = [...movies];

    return sortedMovies.sort((a, b) => {
      if (sortBy === "rating") {
        return sortOrder === "asc"
          ? a.vote_average - b.vote_average
          : b.vote_average - a.vote_average;
      } else if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.release_date) - new Date(b.release_date)
          : new Date(b.release_date) - new Date(a.release_date);
      }
      return 0;
    });
  };

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

  const sortedMovies = sortMovies(movies);

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

      <div className="flex flex-col md:flex-row md:items-center my-6">
        {/* Results Heading */}
        <h2 className="text-xl md:text-2xl font-bold dark:text-gray-200">
          {queryTerm ? `Search Results: ${queryTerm}` : "Upcoming Movies:"}
        </h2>

        {/* Sorting Controls */}
        <SortingControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {/* Movie Grid */}
      <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!loading && sortedMovies.length > 0
          ? sortedMovies.map((movie) => (
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
