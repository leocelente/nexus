import React from "react";
import ReactDOM from "react-dom";
import "./css/bootstrap.css";
import "./index.css";
import App from "./App";
import Admin from "./pages/admin/Admin";

import { Route, Link, BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./Login";

const routes = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={LoginPage} />
        </div>
    </Router>
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <LoginPage> */}
            {routes}
            {/* </LoginPage> */}
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
