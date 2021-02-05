import { SELECT_ATRIBUTO, SELECT_GRUPO } from "../actions";

const initialState = {
    grupo: 0,
    atributo: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SELECT_GRUPO:
            {
                const { id } = action.payload;
                return {
                    ...state,
                    grupo: id,
                };
            }
        case SELECT_ATRIBUTO:
            {
                const { id } = action.payload;
                return {
                    ...state,
                    atributo: id,
                };
            }
        default:
            return state;
    }
}