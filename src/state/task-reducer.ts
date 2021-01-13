import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";


// Типизация Для редьюсера (todoListReducer)
type ActionType = removeTask
    | changeTaskStatus
    | addTask
    | chageTaskTaskTitle
    | AddTodoListActionType
    | RemoveTodoListActionType


type removeTask = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}
type addTask = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
type changeTaskStatus = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistID: string
    isDone: boolean
}

type chageTaskTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistID: string

}
let initialState: TasksStateType = {
    ["todoListID1"]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "GraphQL", isDone: true},
        {id: v1(), title: "Rest API", isDone: false}
    ],
    ["todoListID2"]: [
        {id: v1(), title: "Books", isDone: true},
        {id: v1(), title: "Butter", isDone: true},
        {id: v1(), title: "Onion", isDone: false},
        {id: v1(), title: "Fish", isDone: true},
        {id: v1(), title: "Beer", isDone: false}
    ]
}

// Функция для управления стейтом ( todoListReducer )
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistID] = copyState[action.todolistID].filter(t => t.id !== action.taskID)
            return copyState;
        }

        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistID]: [task, ...state[action.todolistID]]}
        }

        case 'CHANGE-TASK-STATUS': {
            const todoListTasks = state[action.todolistID]
            return {
                ...state, [action.todolistID]: todoListTasks.map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone}
                    : t)
            }
            // let todolistTasks = state[action.todolistID]
            // let task = todolistTasks.find(t => t.id === action.taskID);
            // if (task) {
            //     task.isDone = action.isDone;
            // }
            // return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistID]
            let task = todolistTasks.find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title;
            }
            return ({...state})
        }
        case 'ADD-TODOLIST': {

            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}


// Создание ActionCreator для тестов
export const removeTaskAC = (taskID: string, todolistID: string): removeTask => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}

export const addTaskAC = (title: string, todolistID: string): addTask => {
    return {type: 'ADD-TASK', title, todolistID}
}

export const changeTaskStatusAC = (taskID: string, todolistID: string, isDone: boolean): changeTaskStatus => {
    return {type: 'CHANGE-TASK-STATUS', isDone, taskID, todolistID}
}

export const changeTaskTitleAC = (taskID: string, todolistID: string, title: string): chageTaskTaskTitle => {
    return {type: 'CHANGE-TASK-TITLE', title, taskID, todolistID}
}

