import { ADD_TODO, SELECT_TEMA } from "../actions";

const initialState = {
    allIds: [],
    byIds: {},
    //
    selectedIndicadores: [], // tracks tuple <tema, indicador>
    selectedTema: 0, // tracks tema between pages
    selectedPraticas: [], // tracks tuple <tema, pratica>
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
        default:
            return state;
    }
}