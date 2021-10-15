import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AUTH_CHECK, LOGIN, LOGOUT } from "../../redux/actions";
import { Usuario } from "../models/usuario";
import { Helpers } from "./utils.js";

async function loginUser(user, dispatch) {
    const user_data = (
        await store.collection(`user_data`).doc(user.uid).get()
    ).data();
    dispatch({
        type: LOGIN,
        payload: new Usuario({
            nome: user.email,
            role: user_data.role,
            firebaseUser: user.toJSON(),
        }),
    });
}

const auth = firebase.auth();
const store = firebase.firestore();
export async function isLogged(dispatch) {
    dispatch({ type: AUTH_CHECK, payload: null });
    auth.onIdTokenChanged(async (user) => {
        if (user) {
            await loginUser(user, dispatch);
        } else {
            console.log(AUTH_CHECK);
            dispatch({
                type: AUTH_CHECK,
                payload: false,
            });
        }
    });
}

export function getCurrentUser() {
    if (!isLogged()) {
        throw Error("There is no logged user!!");
        return null;
    }
    return auth.currentUser;
}

export async function firebaseLogin({ email, senha }, dispatch) {
    if (auth.currentUser !== null) {
        await loginUser(auth.currentUser, dispatch);
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
