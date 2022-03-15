import { Propriedade } from "../../api/models/propriedade";
import { SELECT_ADM_PROPRIEDADE, SELECT_PROPRIEDADE_ATUAL } from "../actions";

const initialState = {
    propriedade: new Propriedade(),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_ADM_PROPRIEDADE:
            return { ...state, propriedade: action.payload };

        default:
            return state;
    }
}
