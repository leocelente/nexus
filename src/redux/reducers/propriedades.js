import { FETCH_PROPRIEDADES } from "../actions";


const initialState = {
    data: { propriedades: [{ nome: "", gps: { latitude: 0.0, longitude: 0.0 }, descricao: {} }] }
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