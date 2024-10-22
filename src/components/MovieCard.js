import { useState } from "react";
import { FaPlus, FaInfoCircle, FaTrash } from "react-icons/fa";
import MovieDetailsModal from "./MovieDetailsModal";

const MovieCard = ({
  movie,
  actionType,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleDetailsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToWatchlist = (movie) => {
    onAddToWatchlist(movie);
    setIsAdded(true); // Update state when movie is added
  };

  return (
    <div
      className="flex flex-col border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-0 pb-[150%]">
        <img
          className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-50" : "opacity-100"
          }`}
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black text-center bg-opacity-60 flex flex-col items-center justify-center rounded-md text-white p-4">
            <h2 className="text-xl font-semibold mb-4">{movie.Title}</h2>
            <p className="text-base mb-2">
              <strong>Year:</strong> {movie.Year}
            </p>
            <p className="text-base mb-2">
              <strong>Director:</strong> {movie.Director || "N/A"}
            </p>
            <p className="text-base mb-4">
              <strong>Cast:</strong> {movie.Actors || "N/A"}
            </p>
            <div className="flex space-x-2 mt-4">
              {actionType === "add" ? (
                <button
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-500 transition flex items-center justify-center"
                  onClick={() => handleAddToWatchlist(movie)}
                >
                  <FaPlus className="text-white text-2xl" />
                </button>
              ) : (
                <button
                  className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
                  onClick={() => onRemoveFromWatchlist(movie.imdbID)}
                >
                  <FaTrash className="text-white text-2xl" />
                </button>
              )}

              <button
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition flex items-center justify-center"
                onClick={handleDetailsClick}
              >
                <FaInfoCircle className="text-gray-300 text-2xl" />
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <MovieDetailsModal
            movie={movie}
            isAdded={isAdded}
            addToWatchlist={handleAddToWatchlist}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default MovieCard;
