import { ADD_TODO, SELECT_TEMA } from "./index.js";

export const addTodo = content => ({
    type: ADD_TODO,
    payload: {}
});

export const selectTema = id => ({
    type: SELECT_TEMA,
    payload: { id }
});