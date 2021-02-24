import { fetchPropriedadesFirebase } from "../../api/firebase/index.js";

export const fetchPropriedades = () => async dispatch => {
    await fetchPropriedadesFirebase(dispatch);
};