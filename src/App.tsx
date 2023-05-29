import React, {useState} from 'react';

import './App.css';
import Todolist from "./Todolist";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type FilterType = 'all' | 'active'| 'completed';

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

    const [filter, setFilter] = useState<FilterType>('all')

    let tasksAfterFiltering = tasks1;

    if(filter === 'active') {
        tasksAfterFiltering = tasks1.filter(el => el.isDone);
    }

    if(filter === 'completed') {
        tasksAfterFiltering = tasks1.filter(el => !el.isDone);
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value);
    }

    return (
        <div className='App'>
            <Todolist title={title1} tasks={tasksAfterFiltering} deleteTask={deleteTask} changeFilter={changeFilter}/>
        </div>
    )
}

export default App;

