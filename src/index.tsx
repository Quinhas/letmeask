import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./services/firebase";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
