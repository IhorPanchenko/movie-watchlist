import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../api/moviesApi";
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

  // const handleFetchDetails = (imdbID) => {
  //   dispatch(fetchMovieDetails(imdbID));
  // };

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
            <div key={movie.imdbID} className="border p-4">
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <img src={movie.Poster} alt="movie poster" />
              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>Plot: {movie.Plot}</p>
              <button
                className="bg-gray-500 text-white p-2 rounded mt-2"
                onClick={() => {
                  console.log(movie);
                  // dispatch(addMovieToWatchlist(movie))
                }}
              >
                Add to Watchlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
