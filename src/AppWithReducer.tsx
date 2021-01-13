import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskTitleAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./state/task-reducer";


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

export  type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

function AppWithReducer() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchToTodolist] = useReducer(todoListReducer,([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]))

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Onion", isDone: false},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ]

    });

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title,todoListId)
        dispatchToTasks(action)
    }


    function removeTask(taskID: string, todoListId: string) {
        const action = removeTaskAC(taskID, todoListId)
        dispatchToTasks(action)
    }

    function changeStatus(taskID: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskID, todoListId, isDone)
        dispatchToTasks(action)
    }


    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = ChangeFilterAC(todoListID, value)
        dispatchToTodolist(action)

    }

    function removeTodoList(todoListID: string) {
     const action = RemoveTodoListAC(todoListID)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }

    function changeTaskTitle(taskID: string, title: string, todoListId: string) {
        const action = changeTaskTitleAC(title, taskID, todoListId)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(todoListID: string, title: string) {
        const action = ChangeTitleAC(todoListID, title)
        dispatchToTodolist(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} style={{padding: "10px"}}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            return (
                                <Grid item={true} key={tl.id}>
                                    <Paper style={{padding: "15px"}} elevation={3}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            filter={tl.filter}
                                            changeFilter={changeFilter}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}

                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

