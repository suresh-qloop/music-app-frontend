import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/bootstrap.min.css";
import "./assets/css/all.css";
import "./assets/css/elegant-font-icons.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import { MyContextProvider } from "./context/ModeContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>
);
