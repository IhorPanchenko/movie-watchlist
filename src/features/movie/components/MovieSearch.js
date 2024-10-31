import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../../api/movieApi";
import { addMovieToWatchlist } from "../redux/movieSlice";
import SearchInput from "./SearchInput";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { watchlist, movies, loading, error } = useSelector(
    (state) => state.movies
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchMovies(searchTerm));
      setSearchTerm("");
    }
  };

  const handleAddToWatchlist = (movie) => {
    const isInWatchlist = watchlist.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (!isInWatchlist) {
      dispatch(addMovieToWatchlist(movie));
    } else {
      alert("This movie is already in your watchlist.");
    }
  };

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

      {movies.length > 0 && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
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
