import "regenerator-runtime/runtime.js";

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./global.css";

const container = document.querySelector("#root");
const root = createRoot(container);

const app = (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);

root.render(app);
