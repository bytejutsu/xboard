import React from "react";
import ReactDOM from "react-dom/client";

import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "cropperjs/dist/cropper.css";

import "@assets/scss/index.scss";

import App from "./bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
