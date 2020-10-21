import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

// Типизация Для редьюсера (todoListReducer)
type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTitleActionType | ChangeFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
type ChangeTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

// Функция для управления стейтом ( todoListReducer )
export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl;
            })
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl;
            });
        default:
            throw new Error("I don't understand this type of action")
    }
}
// Создание ActionCreator для тестов
export const RemoveTodoListAC = (todolistID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const ChangeTitleAC = (todolistID: string, title: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: title}
}

export const ChangeFilterAC = (todolistID: string, filter: FilterValuesType): ChangeFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER', id: todolistID, filter: filter}
}