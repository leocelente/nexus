import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "../reducers";
import reduxThunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(rootReducer, composeEnhancer(applyMiddleware(reduxThunk)));