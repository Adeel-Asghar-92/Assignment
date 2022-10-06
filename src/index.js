import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
// import "jquery";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { StoreConfig } from "./redux/store/Store";

const store = StoreConfig;
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
