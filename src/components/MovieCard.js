const MovieCard = ({
  movie,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  actionType,
}) => {
  return (
    <div className="border p-4">
      <img src={movie.Poster} alt="movie poster" />
      <h2 className="text-lg font-bold">{movie.Title}</h2>
      <p>
        {movie.Year}, {movie.Country}, {movie.Genre}
      </p>

      {actionType === "add" ? (
        <button
          className="bg-gray-500 text-white p-2 rounded mt-2"
          onClick={() => {
            onAddToWatchlist(movie);
          }}
        >
          Add to Watchlist
        </button>
      ) : (
        <button
          className="bg-red-500 text-white p-2 rounded mt-2"
          onClick={() => {
            onRemoveFromWatchlist(movie.imdbID);
          }}
        >
          Remove from Watchlist
        </button>
      )}
    </div>
  );
};

export default MovieCard;
