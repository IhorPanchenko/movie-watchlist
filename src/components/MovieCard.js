const MovieCard = ({
  movie,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  actionType,
}) => {
  return (
    <div className="flex flex-col min-h-[500px] border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative w-full pb-[80%] md:pb-[120%] sm:pb-[130%]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {movie.Title}
        </h2>
        <p className="text-gray-600">
          <span className="font-semibold">Year:</span> {movie.Year}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Director:</span>{" "}
          {movie.Director || "N/A"}
        </p>
        <p className="text-gray-600 truncate">
          <span className="font-semibold">Actors:</span> {movie.Actors || "N/A"}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Genre:</span> {movie.Genre || "N/A"}
        </p>
      </div>

      {actionType === "add" ? (
        <button
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out mt-auto"
          onClick={() => {
            onAddToWatchlist(movie);
          }}
        >
          Add to Watchlist
        </button>
      ) : (
        <button
          className="w-full bg-red-500 text-white font-semibold p-2 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out mt-auto"
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
