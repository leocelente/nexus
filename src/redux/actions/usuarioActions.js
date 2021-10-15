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
