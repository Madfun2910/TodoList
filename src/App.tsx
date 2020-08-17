import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

 export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const jsTasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]
    const wordsTasks: Array<TaskType> = [
        {id: 1, title: "Hello World", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]


    return (
        <div className="App">
            <TodoList title="What to learn" tasks={jsTasks}/>
            <TodoList title="Words" tasks={wordsTasks}/>
        </div>

    );
}

export default App;
