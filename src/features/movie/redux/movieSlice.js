import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, fetchUpcomingMovies } from "../../../api/movieApi";

const initialState = {
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
  movies: [],
  upcomingMovies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovieToWatchlist: (state, action) => {
      const movieExists = state.watchlist.some(
        (movie) => movie.id === action.payload.id
      );

      if (!movieExists) {
        state.watchlist.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      } else {
        console.warn(
          `Movie with ID ${action.payload.id} is already in the watchlist.`
        );
      }
    },
    removeMovieFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong during the fetch.";
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong during the fetch.";
      });
  },
});

export const { addMovieToWatchlist, removeMovieFromWatchlist } =
  movieSlice.actions;

export default movieSlice.reducer;
