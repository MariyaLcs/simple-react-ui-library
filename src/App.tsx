import store from "./lib/store";
import { Provider } from "react-redux";
import NotificationScreen from "./components/screens/NotificationScreen";

function App() {
  return (
    <Provider store={store}>
      <NotificationScreen />
    </Provider>
  );
}

export default App;
