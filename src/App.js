import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { store } from "./features/movie/redux/store/store";
import Navbar from "./features/movie/components/Navbar/Navbar";
import MovieSearch from "./features/movie/components/MovieSearch/MovieSearch";
import Watchlist from "./features/movie/components/Watchlist";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter
        basename="/movie-watchlist"
        future={{
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_relativeSplatPath: true,
          v7_skipActionErrorRevalidation: true,
          v7_startTransition: true,
        }}
      >
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navbar />
          <ToastContainer autoClose={1500} />

          <main className="mx-auto max-w-7xl px-4 py-20">
            <Routes>
              <Route path="/" element={<MovieSearch />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
