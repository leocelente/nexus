import { SELECT_ADM_PROPRIEDADE } from "./index.js";

export const select_propriedade = (propriedade) => async (dispatch) => {
    dispatch({
        type: SELECT_ADM_PROPRIEDADE,
        payload: propriedade,
    });
};
