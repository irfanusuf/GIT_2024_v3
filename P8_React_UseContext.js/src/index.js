import ReactDOM from "react-dom/client";
import Store from "./context/Store";
import "./styles/output.css";
import "animate.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Store />
  </BrowserRouter>
);
