import { Provider } from "react-redux";
import { store } from "./redux/store";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <Provider store={store}>
      <MovieSearch />
    </Provider>
  );
}

export default App;
