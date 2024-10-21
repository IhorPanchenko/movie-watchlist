const MovieCard = ({ movie, addMovieToWatchlist }) => {
  return (
    <div className="border p-4">
      <img src={movie.Poster} alt="movie poster" />
      <h2 className="text-lg font-bold">{movie.Title}</h2>
      <p>
        {movie.Year}, {movie.Country}, {movie.Genre}
      </p>

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
  );
};

export default MovieCard;
