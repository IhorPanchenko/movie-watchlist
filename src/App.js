import { Provider } from "react-redux";
import { store } from "./redux/store";
import MovieSearch from "./components/MovieSearch";
import Watchlist from "./components/WatchList";

function App() {
  return (
    <Provider store={store}>
      <MovieSearch />
      <Watchlist />
    </Provider>
  );
}

export default App;
