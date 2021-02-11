import "./global.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = document.querySelector("#root");

const app = (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);

ReactDOM.render(app, root);
