import "regenerator-runtime/runtime.js";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./global.css";

const root = document.querySelector("#root");

const app = (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);

ReactDOM.render(app, root);
