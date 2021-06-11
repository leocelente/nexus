import { Pratica } from "../../api/models/pratica";
import { Propriedade } from "../../api/models/propriedade";
import { SELECT_TEMA, FETCH_PRATICAS, SELECT_PRATICA } from "../actions";

const initialState = {
    selectedIndicadores: [],
    selectedTema: 0,
    pratica: new Pratica({}),
    temas: [
        {
            praticas: [new Pratica({})],
        },
    ],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_TEMA:
        case SELECT_PRATICA:
        case FETCH_PRATICAS: {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
}
