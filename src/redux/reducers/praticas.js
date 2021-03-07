import { ADD_TODO, SELECT_TEMA, FETCH_PRATICAS, SELECT_PRATICA } from "../actions";

const initialState = {
    selectedIndicadores: [],
    selectedTema: 0,
    pratica: { propriedades: [{ gps: { latitude: 0.0, longitude: 0.0 } }] },
    data: { temas: [{ praticas: [{ propriedades: [], b_atributos: [], benchmark: { agua: 0, alimento: 0, energia: 0 } }] }] }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            {
                return state;
            }
        case SELECT_TEMA:
            {
                const { id } = action.payload;
                return {
                    ...state,
                    selectedTema: id,
                };
            }
        case SELECT_PRATICA:
            {
                const { pratica } = action.payload;
                return {
                    ...state,
                    pratica,
                };
            }
        case FETCH_PRATICAS:
            {
                return {...state, data: action.payload };
            }

        default:
            return state;
    }
}