import { v1 } from "uuid";
import { FilterType, TodolistType } from "../App";

export const todolistReducer = (state: TodolistType[], action: todolistReducerType): TodolistType[] =>  {
    switch(action.type){
        case 'REMOVE-TODOLIST' : return state.filter(el => el.id !== action.payload.todolistId);
        case 'ADD-TODOLIST' : return [{ id: action.payload.newId, title: action.payload.title, filter: 'all' }, ...state];
        case "UPDATE-TITLE": return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el);
        case "CHANGE-FILTER": return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el);
        default: return state; 
    }
}

type todolistReducerType = RemoveTodolistType | AddTodolistType | updateTitleTodolistType | changeFilterType ;

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId 
        }
    } as const
}

type AddTodolistType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string, newId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newId
        }
    } as const
}

type updateTitleTodolistType = ReturnType<typeof updateTitleTodolistAC>;
export const updateTitleTodolistAC = (todolistId: string, newTitle: string ) => {
    return {
        type: 'UPDATE-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

type changeFilterType = ReturnType<typeof changeFilterAC>;
export const changeFilterAC = (value: FilterType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value,
            todolistId
        }
    } as const

}
