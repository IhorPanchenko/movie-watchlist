import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movie/redux/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
