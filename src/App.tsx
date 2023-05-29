import React, {useState} from 'react';

import './App.css';
import Todolist from "./Todolist";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}
function App() {


    const title1 = "What to learn";


    const [tasks1, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: false },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        {id: 4, title: "GraphQL", isDone: true},
        {id: 5, title: "Java", isDone: true}
    ])

    const deleteTask = (id: number) => {
        setTasks(tasks1.filter(el =>  el.id !== id))
    }

    return (
        <div className='App'>
            <Todolist title={title1} tasks={tasks1} deleteTask={deleteTask}/>
        </div>
    )
}

export default App;

