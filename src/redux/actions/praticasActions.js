import { ADD_TODO, SELECT_TEMA } from "./index.js";

let nextTodoId = 0;

export const addTodo = content => ({
    type: ADD_TODO,
    payload: {}
});

export const selectTema = id => ({
    type: SELECT_TEMA,
    payload: { id }
});