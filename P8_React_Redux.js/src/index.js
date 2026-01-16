import ReactDOM from "react-dom/client";

import "./styles/output.css";
import "animate.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
