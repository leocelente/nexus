import { Propriedade } from "../../api/models/propriedade";
import { FETCH_PROPRIEDADES, SELECT_PROPRIEDADE } from "../actions";

const initialState = {
    propriedades: [new Propriedade({})],
    propriedade: new Propriedade({}),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_PROPRIEDADE:
        case FETCH_PROPRIEDADES: {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
}
