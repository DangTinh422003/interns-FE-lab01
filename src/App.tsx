import { Provider } from "react-redux";
import TodoApp from "./components/Todo";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoApp />
      </div>
    </Provider>
  );
}

export default App;
