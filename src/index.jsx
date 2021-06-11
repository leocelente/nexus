import React from "react";
import ReactDOM from "react-dom";
import "./css/bootstrap.css";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./Login";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <LoginPage> */}
            <App />
            {/* </LoginPage> */}
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
