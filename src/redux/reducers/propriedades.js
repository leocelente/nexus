import { Propriedade } from "../../api/models/propriedade";
import { FETCH_PROPRIEDADES } from "../actions";

const initialState = {
    data: {
        propriedades: [new Propriedade({})],
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PROPRIEDADES: {
            return { ...state, data: action.payload };
        }
        default:
            return state;
    }
}
