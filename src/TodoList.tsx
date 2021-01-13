import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType,} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListID: string) => void

    addTask: (title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
//сделать юзКоллбэк
    let task = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        };
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        };

        const changeTaskTitle = (value: string) => {
            props.changeTaskTitle(t.id, value, props.id)
        }

        return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    // type="checkbox"
                    color="primary"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        )
    })

    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.id);
    },[props.addTask,props.id]);

    const changeTodoListTitle = useCallback ((title: string) => {
        props.changeTodoListTitle(props.id, title);
    },[props.changeTodoListTitle,props.id]);

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),
        [props.changeFilter,props.id])
    const onActiveClickHandler = useCallback (() => props.changeFilter("active", props.id),
        [props.changeFilter,props.id])
    const onCompletedHandler = useCallback(() => props.changeFilter("completed", props.id),
    [props.changeFilter,props.id])

    return (
        <div>
            <h3><EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={() => {
                    props.removeTodoList(props.id)
                }}>
                    <Delete/>
                </IconButton>

                {/*<button onClick={() => {*/}
                {/*    props.removeTodoList(props.id)*/}
                {/*}}> X*/}
                {/*</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>


            <div>
                {task}
            </div>
            <div>
                <Button variant={"contained"}
                        style={{margin: "3px"}}
                        size={"small"}
                        color={props.filter === "all" ? "primary" : "default"}
                    // className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={"contained"}
                        style={{margin: "3px"}}
                        size={"small"}
                        color={props.filter === "active" ? "primary" : "default"}
                    // className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={"contained"}
                        style={{margin: "3px"}}
                        size={"small"}
                        color={props.filter === "completed" ? "primary" : "default"}
                    // className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedHandler}>Completed
                </Button>
            </div>
        </div>

    );
})


