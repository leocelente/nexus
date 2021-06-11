import { Usuario } from "../../api/models/usuario";
import { LOGIN, LOGOUT } from "../actions";

const initialState = {
    usuario: new Usuario(),
    logado: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            console.log("USER", action.payload);
            return { ...state, ...action.payload, logado: true };
        case LOGOUT:
            return { ...state, usuario: new Usuario({}), logado: false };
        default:
            return state;
    }
}
