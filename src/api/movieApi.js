import { createAsyncThunk } from "@reduxjs/toolkit";

const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
const tmdbBaseUrl = "https://api.themoviedb.org/3";

const fetchFromApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Fetch movies by search term (using TMDb)
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm, { rejectWithValue }) => {
    try {
      // Fetch the list of movies based on the search term
      const moviesUrl = `${tmdbBaseUrl}/search/movie?api_key=${tmdbApiKey}&query=${searchTerm}&language=en-US`;
      const { results: movies, total_results } = await fetchFromApi(moviesUrl);

      if (!movies || total_results === 0) {
        throw new Error("No movies found");
      }

      // Fetch details for each movie in parallel
      const moviesWithDetails = await Promise.all(
        movies.map(async (movie) => {
          const detailUrl = `${tmdbBaseUrl}/movie/${movie.id}?api_key=${tmdbApiKey}&language=en-US`;
          const creditsUrl = `${tmdbBaseUrl}/movie/${movie.id}/credits?api_key=${tmdbApiKey}`;

          const movieDetails = await fetchFromApi(detailUrl);
          const movieCredits = await fetchFromApi(creditsUrl);

          // Combine movie details with credits
          const directors = movieCredits.crew
            .filter((member) => member.job === "Director")
            .map((director) => director.name);

          const actors = movieCredits.cast
            .slice(0, 4)
            .map((actor) => actor.name);

          return { ...movie, ...movieDetails, directors, actors };
        })
      );
      console.log("Movies with details:", moviesWithDetails);

      return moviesWithDetails;
    } catch (error) {
      console.log("Fetch movies with details failed:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch upcoming movies (using TMDb)
export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const upcomingMoviesUrl = `${tmdbBaseUrl}/movie/upcoming?api_key=${tmdbApiKey}&language=en-US&region=US`;
      const { results } = await fetchFromApi(upcomingMoviesUrl);
      return results;
    } catch (error) {
      console.log("Fetch upcoming movies failed:", error);
      return rejectWithValue(error.message);
    }
  }
);
