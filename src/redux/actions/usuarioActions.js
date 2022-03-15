import { SELECT_PROPRIEDADE_ATUAL } from ".";
import {
    firebaseLogin,
    firebaseLogout,
    isLogged,
} from "../../api/firebase/auth";

export const action_login = (cred) => async (dispatch) => {
    firebaseLogin(cred, dispatch);
};

export const action_logout = () => async (dispatch) => {
    firebaseLogout(dispatch);
};

export const is_logged = () => async (dispatch) => {
    isLogged(dispatch);
};

export const selectPropriedadeAtual = (atual) => (dispatch) => {
    dispatch({
        type: SELECT_PROPRIEDADE_ATUAL,
        payload: atual,
    });
};
