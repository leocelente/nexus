import { fetchPraticasFirebase } from "../../api/firebase/index.js";
import { SELECT_TEMA, SELECT_PRATICA, EDIT_CONJUNTO } from "./index.js";

export const selectTema = (id) => ({
    type: SELECT_TEMA,
    payload: { selectedTema: id },
});

export const selectPratica = (pratica) => ({
    type: SELECT_PRATICA,
    payload: { pratica },
});

export const editConjunto = (conjunto) => ({
    type: EDIT_CONJUNTO,
    payload: { conjunto },
});

export const fetchPraticas = () => async (dispatch) => {
    await fetchPraticasFirebase(dispatch);
};
