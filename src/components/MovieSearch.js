import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { fetchMovies } from "../api/moviesApi";
import { addMovieToWatchlist } from "../redux/movieSlice";

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
    }
    setSearchTerm("");
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
      <form
        className="flex flex-col md:flex-row items-center justify-center mb-8"
        onSubmit={handleSearch}
      >
        <input
          className="border border-gray-300 p-3 rounded-lg w-full md:w-auto flex-grow md:flex-grow-0 mb-4 md:mb-0"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a movie"
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-lg w-full md:w-auto md:ml-4 transition-colors duration-300 hover:bg-blue-600"
          type="submit"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onAddToWatchlist={handleAddToWatchlist}
              actionType="add"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
