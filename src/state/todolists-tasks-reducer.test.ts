import {TasksStateType, TodoListType} from "../App";
import {tasksReducer} from "./task-reducer";
import {AddTodoListAC, todoListReducer} from "./todolist-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(idFromTasks);
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});




