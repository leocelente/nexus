import { Usuario } from "../../api/models/usuario";
import {
    LOGIN,
    LOGOUT,
    AUTH_CHECK,
    WAIT,
    SELECT_PROPRIEDADE_ATUAL,
} from "../actions";

const initialState = {
    usuario: new Usuario(),
    temporary_propriedade: "",
    logado: null,
    wait: false,
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
        case WAIT:
            return { ...state, wait: true };
        case SELECT_PROPRIEDADE_ATUAL:
            return { ...state, temporary_propriedade: action.payload };
        default:
            return state;
    }
}
