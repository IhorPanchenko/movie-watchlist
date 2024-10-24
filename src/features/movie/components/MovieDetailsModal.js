import PropTypes from "prop-types";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const MovieDetailsModal = ({
  movie: {
    Title,
    Year,
    Rated,
    Runtime,
    Metascore,
    imdbRating,
    Poster,
    Genre,
    Plot,
    Director,
    Writer,
    Actors,
    Country,
    Awards,
  },
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
              ? "bg-red-600 hover:bg-red-700 border border-red-400"
              : "bg-green-600 hover:bg-green-700 border border-green-400"
          }`}
          aria-label={
            isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
          }
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{Title}</h2>
            <div className="flex text-gray-600">
              <span>{Year}</span>
              <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>{Rated}</span>
              <div className="mx-2 my-auto w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>{Runtime}</span>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="w-1/4 flex items-center justify-between text-center text-gray-800">
            <div>
              <div className="text-base font-semibold">Metascore</div>
              <div className="text-sm">{Metascore}%</div>
            </div>
            <div>
              <div className="text-base font-semibold">IMDb</div>
              <div className="text-sm">{imdbRating}/10</div>
            </div>
          </div>
        </div>

        {/* Movie Content */}
        <div className="flex">
          {/* Poster */}
          <div className="w-1/3 min-h-[360px]">
            <img
              className="w-full h-auto rounded-md shadow-md"
              src={Poster}
              alt={`${Title} poster`}
            />
          </div>

          {/* Movie Details */}
          <div className="w-2/3 pl-6 text-gray-700">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Genre
                ? Genre.split(", ").map((genre, index) => (
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
            <p className="text-base mb-3">{Plot || "N/A"}</p>
            <p className="text-base mb-2">
              <strong>Director:</strong> {Director || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Writer:</strong> {Writer || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Cast:</strong> {Actors || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Country:</strong> {Country || "N/A"}
            </p>
            <p className="text-base mb-2">
              <strong>Awards:</strong> {Awards || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieDetailsModal.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
    Rated: PropTypes.string,
    Runtime: PropTypes.string,
    Metascore: PropTypes.string,
    imdbRating: PropTypes.string,
    Poster: PropTypes.string,
    Genre: PropTypes.string,
    Plot: PropTypes.string,
    Director: PropTypes.string,
    Writer: PropTypes.string,
    Actors: PropTypes.string,
    Country: PropTypes.string,
    Awards: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  handleToggleWatchlist: PropTypes.func.isRequired,
  isInWatchlist: PropTypes.bool.isRequired,
};

export default MovieDetailsModal;
