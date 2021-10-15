import { combineReducers } from "redux";
import praticas from "./praticas";
import indicadores from "./indicadores";
import propriedades from "./propriedades";
import authentication from "./usuario";
import admin from "./admin";

export default combineReducers({
    praticas,
    indicadores,
    propriedades,
    authentication,
    admin,
});
