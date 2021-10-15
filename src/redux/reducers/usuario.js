import { Usuario } from "../../api/models/usuario";
import { LOGIN, LOGOUT, AUTH_CHECK } from "../actions";

const initialState = {
    usuario: new Usuario(),
    logado: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            const usuario = action.payload;
            return { ...state, usuario, logado: true };
        case LOGOUT:
            return { ...state, usuario: new Usuario({}), logado: false };
        case AUTH_CHECK:
            return { ...state, logado: action.payload };
        default:
            return state;
    }
}
