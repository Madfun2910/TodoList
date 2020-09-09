import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

 export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export  type FilterValuesType = "all"|"active"|"completed"

function App() {
     let [tasks, setTasks ] = useState <Array<TaskType>>([
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "GraphQL", isDone: true},
         {id: v1(), title: "Rest API", isDone: false}
     ]);

     // let tasks = array[0];
     // let setTasks = array[1];

     let [filter, setFilter] = useState <FilterValuesType>("all")


    function addTask(title: string) {
         let newTask: TaskType = {id: v1(), title: title, isDone: false};
         setTasks([newTask, ...tasks])
    }


    function removeTask (taskID: string) {
        setTasks (tasks.filter( t => t.id !== taskID))
    }

    function changerFilter(value: FilterValuesType){
         setFilter(value)
    }

    function changeStatus (taskID: string, isDone: boolean ) {
         let task = tasks.find( t => t.id === taskID);

         if(task) {
            task.isDone = isDone;
            setTasks([...tasks])
         }

    }

    let tasksForTodoList = tasks;
     if(filter === "active"){
         tasksForTodoList = tasks.filter( t => t.isDone === false)
     }
     if (filter === "completed") {
         tasksForTodoList = tasks.filter( t => t.isDone === true)
     }

    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changerFilter}
                addTask={addTask}
                changeStatus={changeStatus}

            />

        </div>

    );
}

export default App;
