import { combineReducers } from "redux";
import praticas from "./praticas";
import indicadores from "./indicadores";
import propriedades from "./propriedades";
import authentication from "./usuario";

export default combineReducers({
    praticas,
    indicadores,
    propriedades,
    authentication,
});
