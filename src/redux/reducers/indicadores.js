import { SELECT_ATRIBUTO, SELECT_GRUPO, FETCH_INDICADORES, SELECT_INDICADOR, FETCH_SERIE_HIST } from "../actions";

const initialState = {
    grupo: 0,
    atributo: 0,
    data: { grupos: [{ name: "", atributos: [{ indicadores: [{ nome: "" }] }] }] },
    serie: { dados: [{ data: [{ propriedade: {}, valor: 0 }], indicador: { nome: "" } }] },
    selectedIndicador: { indicador: { nome: "" } }
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
        case FETCH_INDICADORES:
            {
                return {...state, data: action.payload };
            }
        case FETCH_SERIE_HIST:
            {
                return {...state, ...action.payload };
            }
        case SELECT_INDICADOR:
            {
                return {...state, selectedIndicador: action.payload };
            }

        default:
            return state;
    }
}