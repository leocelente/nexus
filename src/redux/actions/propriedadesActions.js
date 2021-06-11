import { fetchPropriedadesFirebase } from "../../api/firebase/index.js";
import { SELECT_PROPRIEDADE } from "./index.js";

export const fetchPropriedades = () => async (dispatch) => {
    await fetchPropriedadesFirebase(dispatch);
};

export const selectPropriedade = (i) => ({
    type: SELECT_PROPRIEDADE,
    payload: { propriedade: i },
});
