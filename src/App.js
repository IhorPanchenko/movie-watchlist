import { Provider } from "react-redux";
import { store } from "./redux/store";
import MovieSearch from "./components/MovieSearch";
import Watchlist from "./components/Watchlist";

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
