import { combineReducers } from "redux";
import praticas from "./praticas";
import indicadores from "./indicadores";
import propriedades from "./propriedades";

export default combineReducers({ praticas, indicadores, propriedades });