import React from "react";
import ReactDOM from "react-dom";
import "./css/bootstrap.css";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

// import firebase from "firebase/app";
// import "firebase/firestore";
// import test from "./api/firebase/index";

// test();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
