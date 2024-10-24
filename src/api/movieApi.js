import { createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;
const baseUrl = "http://www.omdbapi.com/";

const fetchFromApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const moviesUrl = `${baseUrl}?apikey=${apiKey}&s=${searchTerm}`;
      const { Search, Response, Error } = await fetchFromApi(moviesUrl);

      if (Response === "False") {
        throw new Error(Error);
      }

      const moviesWithDetails = await Promise.all(
        Search.map(async (movie) => {
          const detailUrl = `${baseUrl}?apikey=${apiKey}&i=${movie.imdbID}`;
          const detailData = await fetchFromApi(detailUrl);
          return { ...movie, ...detailData };
        })
      );

      return moviesWithDetails;
    } catch (error) {
      console.log("Fetch movies failed:", error);
      return rejectWithValue(error.message);
    }
  }
);
