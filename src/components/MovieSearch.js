import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../api/moviesApi";
import MovieCard from "./MovieCard";
import { addMovieToWatchlist } from "../redux/movieSlice";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchMovies(searchTerm));
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch}>
        <input
          className="border p-2 rounded"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a movie"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded ml-2"
          type="submit"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
