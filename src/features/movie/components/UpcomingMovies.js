// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import MovieCard from "./MovieCard";
// import { fetchUpcomingMovies } from "../../../api/movieApi"; // Adjust the import path if needed

// const UpcomingMovies = () => {
//   const dispatch = useDispatch();
//   const { upcomingMovies, loading, error } = useSelector(
//     (state) => state.movies
//   );

//   useEffect(() => {
//     dispatch(fetchUpcomingMovies());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading upcoming movies...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {upcomingMovies.length > 0 ? (
//           upcomingMovies.map((movie) => (
//             <MovieCard key={movie.id || movie.imdbID} movie={movie} />
//           ))
//         ) : (
//           <div>No upcoming movies available.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpcomingMovies;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMovies } from "../../../api/movieApi";
import MovieCard from "./MovieCard/MovieCard";

const UpcomingMovies = () => {
  const dispatch = useDispatch();
  const { upcomingMovies, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  if (loading) return <p>Loading upcoming movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold my-6 dark:text-gray-200">
        Upcoming Movies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {upcomingMovies.length === 0 ? (
          <p>No upcoming movies found.</p>
        ) : (
          upcomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingMovies;
