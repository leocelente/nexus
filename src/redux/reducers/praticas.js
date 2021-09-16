import { Analise, Cenario } from "../../api/models/conjunto";
import { Pratica } from "../../api/models/pratica";
import { Propriedade } from "../../api/models/propriedade";
import {
    SELECT_TEMA,
    FETCH_PRATICAS,
    SELECT_PRATICA,
    EDIT_CONJUNTO,
    REM_CONJUNTO,
    ADD_CONJUNTO,
} from "../actions";

const initialState = {
    selectedIndicadores: [],
    selectedTema: 0,
    pratica: new Pratica({}),
    conjunto: [],
    analise: new Analise(),
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

        case EDIT_CONJUNTO: {
            const { index, praticas } = action.payload;
            const n_cenarios = Array.from(state.analise.cenarios);
            n_cenarios[index].update(praticas);
            return {
                ...state,
                analise: {
                    ...state.analise,
                    cenarios: n_cenarios,
                },
            };
        }
        case ADD_CONJUNTO: {
            const analise = Analise.from(state.analise);
            analise.add(new Cenario());
            return {
                ...state,
                analise,
            };
        }
        case REM_CONJUNTO: {
            const cenario = action.payload.cenario;
            const { index } = cenario;
            const analise = Array.from(state.analise);
            delete analise.cenarios[index];
            return { ...state, analise };
        }

        default:
            return state;
    }
}
