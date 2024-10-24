import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const MovieDetailsModal = ({
  movie,
  onClose,
  handleToggleWatchlist,
  isInWatchlist,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg">
        {/* Toggle Button */}
        <button
          onClick={handleToggleWatchlist}
          className={`absolute -top-4 right-7 flex items-center justify-center w-8 h-8 text-white rounded-full transition ${
            isInWatchlist
              ? "bg-red-600 hover:bg-red-700 border border-red-400" // Red for removing from watchlist
              : "bg-green-600 hover:bg-green-700 border border-green-400" // Green for adding to watchlist
          }`} // Adding a shadow for depth
        >
          {isInWatchlist ? (
            <FaTrash className="text-sm" />
          ) : (
            <FaPlus className="text-sm" />
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white transition hover:bg-gray-700 border border-gray-400"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Movie Info Header */}
        <div className="flex justify-between items-baseline mb-4">
          <div className="w-3/4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {movie.Title}
            </h2>
            <div className="flex text-gray-600">
              <span>{movie.Year}</span>
              <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>{movie.Rated}</span>
              <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>{movie.Runtime}</span>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="w-1/4 flex items-center justify-between text-center text-gray-800">
            <div>
              <div className="text-base font-semibold">Metascore</div>
              <div className="text-sm">{movie.Metascore}%</div>
            </div>
            <div>
              <div className="text-base font-semibold">IMDb</div>
              <div className="text-sm">{movie.imdbRating}/10</div>
            </div>
          </div>
        </div>

        {/* Movie Content */}
        <div className="flex">
          {/* Poster */}
          <div className="w-1/3 min-h-[360px]">
            <img
              className="w-full h-auto rounded-md shadow-md"
              src={movie.Poster}
              alt={`${movie.Title} poster`}
            />
          </div>

          {/* Movie Details */}
          <div className="w-2/3 pl-6 text-gray-700">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.Genre
                ? movie.Genre.split(", ").map((genre, index) => (
                    <span
                      key={index}
                      className="border border-gray-300 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))
                : "N/A"}
            </div>

            {/* Additional Info */}
            <p className="text-base mb-3">{movie.Plot || "N/A"}</p>
            <p className="text-base mb-2">
              <strong>Director:</strong> {movie.Director || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Writer:</strong> {movie.Writer || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Cast:</strong> {movie.Actors || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Country:</strong> {movie.Country || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Awards:</strong> {movie.Awards || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
