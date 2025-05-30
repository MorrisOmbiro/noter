import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
