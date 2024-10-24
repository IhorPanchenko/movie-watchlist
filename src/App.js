import { Provider } from "react-redux";
import { store } from "./redux/store";
import MovieSearch from "./features/movie/components/MovieSearch";
import Watchlist from "./features/movie/components/Watchlist";

function App() {
  return (
    <Provider store={store}>
      <div className="p-4 max-w-6xl mx-auto">
        <MovieSearch />
        <Watchlist />
      </div>
    </Provider>
  );
}

export default App;
