import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./features/movie/redux/store/store";
import MovieSearch from "./features/movie/components/MovieSearch";
import Watchlist from "./features/movie/components/Watchlist";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-white dark:bg-gray-900">
        <div className="p-4 max-w-6xl mx-auto">
          <ToastContainer />
          <MovieSearch />
          <Watchlist />
        </div>
      </div>
    </Provider>
  );
}

export default App;
