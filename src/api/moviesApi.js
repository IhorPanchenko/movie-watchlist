import { createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      const movies = data.Search;

      const moviesWithDetails = await Promise.all(
        movies.map(async (movie) => {
          const detailResponse = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
          );
          if (!detailResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const detailData = await detailResponse.json();
          return { ...movie, ...detailData };
        })
      );

      return moviesWithDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
