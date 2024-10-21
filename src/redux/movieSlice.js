import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, fetchMovieDetails } from "../api/moviesApi";

const initialState = {
  watchlist: [],
  movies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovieToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeMovieFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.imdbID !== action.payload
      );
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
        state.error = action.payload || "Something went wrong";
      });
    // .addCase(fetchMovieDetails.fulfilled, (state, action) => {
    //   const updatedMovies = state.movies.map((movie) => {
    //     if (movie.imdbID === action.payload.imdbID) {
    //       return { ...movie, ...action.payload };
    //     }
    //     return movie;
    //   });
    //   state.movies = updatedMovies;
    // });
  },
});

export const { addMovieToWatchlist, removeMovieFromWatchlist } =
  movieSlice.actions;
export default movieSlice.reducer;
