import {
    fetchIndicadoresFirebase,
    fetchSerieHistoricaFirebase,
} from "../../api/firebase/index.js";

import {
    SELECT_GRUPO,
    SELECT_ATRIBUTO,
    SELECT_INDICADOR,
    WAIT,
} from "./index.js";

export const selectGrupo = (id) => ({
    type: SELECT_GRUPO,
    payload: { id },
});

export const selectAtributo = (id) => ({
    type: SELECT_ATRIBUTO,
    payload: { id },
});

export const selectIndicador = (i) => ({
    type: SELECT_INDICADOR,
    payload: { indicador: i },
});

export const fetchIndicadores = () => async (dispatch) => {
    dispatch({ type: WAIT, payload: true });
    fetchIndicadoresFirebase(dispatch);
};

export const fetchSerieHist = () => async (dispatch) => {
    fetchSerieHistoricaFirebase(dispatch);
};
