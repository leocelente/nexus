import { firebaseLogin, firebaseLogout } from "../../api/firebase/auth";

export const action_login = (cred) => async (dispatch) => {
    console.log("ACTION: ", cred);
    firebaseLogin(cred, dispatch);
};

export const action_logout = () => async (dispatch) => {
    firebaseLogout(dispatch);
};
