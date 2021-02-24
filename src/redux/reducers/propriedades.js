import { FETCH_PROPRIEDADES } from "../actions";


const initialState = {
    data: { propriedades: [{ nome: "", gps: "", descricao: {} }] }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROPRIEDADES:
            {
                return {...state, data: action.payload };
            }

        default:
            return state;
    }
}