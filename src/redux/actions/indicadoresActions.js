import { SELECT_GRUPO, SELECT_ATRIBUTO } from "./index.js";

export const selectGrupo = id => ({
    type: SELECT_GRUPO,
    payload: { id }
});

export const selectAtributo = id => ({
    type: SELECT_ATRIBUTO,
    payload: { id }
});