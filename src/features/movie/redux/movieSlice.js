import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "../../../api/movieApi";

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
  },
});

export const { addMovieToWatchlist, removeMovieFromWatchlist } =
  movieSlice.actions;
export default movieSlice.reducer;
