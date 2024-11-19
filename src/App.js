import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { store } from "./features/movie/redux/store/store";
import Navbar from "./features/movie/components/Navbar";
import MovieSearch from "./features/movie/components/MovieSearch";
import Watchlist from "./features/movie/components/Watchlist";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navbar />

          <main className="mx-auto max-w-7xl px-4 pt-20">
            <ToastContainer />
            <Routes>
              <Route path="/" element={<MovieSearch />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
