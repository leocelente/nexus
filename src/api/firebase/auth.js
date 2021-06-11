import firebase from "firebase/app";
import "firebase/auth";
import { LOGIN, LOGOUT } from "../../redux/actions";
import { Usuario } from "../models/usuario";

const auth = firebase.auth();

export async function firebaseLogin({ email, senha }, dispatch) {
    if (auth.currentUser !== null) {
        dispatch({
            type: LOGIN,
            payload: new Usuario({
                nome: auth.currentUser.email,
                firebaseUser: auth.currentUser.toJSON(),
            }),
        });
    } else {
        let { user } = await auth.signInWithEmailAndPassword(email, senha);
        dispatch({
            type: LOGIN,
            payload: new Usuario({
                nome: user.email,
                firebaseUser: user.toJSON(),
            }),
        });
    }
}

export async function firebaseLogout(dispatch) {
    await auth.signOut();
    dispatch({
        type: LOGOUT,
        payload: { nome: null },
    });
}
