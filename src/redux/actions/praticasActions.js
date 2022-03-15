import { fetchPraticasFirebase } from "../../api/firebase/index.js";
import {
    SELECT_TEMA,
    SELECT_PRATICA,
    EDIT_CONJUNTO,
    ADD_CONJUNTO,
    REM_CONJUNTO,
    SET_RESULTADOS,
} from "./index.js";

export const selectTema = (id) => ({
    type: SELECT_TEMA,
    payload: { selectedTema: id },
});

export const selectPratica = (pratica) => ({
    type: SELECT_PRATICA,
    payload: { pratica },
});

export const editConjunto = (index, praticas) => ({
    type: EDIT_CONJUNTO,
    payload: { index, praticas },
});

export const fetchPraticas = () => async (dispatch) => {
    await fetchPraticasFirebase(dispatch);
};

export const addConjunto = () => ({
    type: ADD_CONJUNTO,
    payload: {},
});

export const setResultados = (resultados, level) => ({
    type: SET_RESULTADOS,
    payload: { resultados, level },
});
