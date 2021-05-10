import { fetchPraticasFirebase } from "../../api/firebase/index.js";
import { SELECT_TEMA, SELECT_PRATICA } from "./index.js";


export const selectTema = id => ({
    type: SELECT_TEMA,
    payload: { id }
});

export const selectPratica = pratica => ({
    type: SELECT_PRATICA,
    payload: { pratica }
});


export const fetchPraticas = () => async dispatch => {
    await fetchPraticasFirebase(dispatch);
};