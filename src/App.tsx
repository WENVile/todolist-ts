import React, { useState } from 'react';

import './App.css';

import Todolist from "./Todolist";
import { v1 } from "uuid";


export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {


    const title1 = "What to learn";


    const [tasks1, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: false },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "GraphQL", isDone: true },
        { id: v1(), title: "Java", isDone: true }
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const changeFilter = (value: FilterType) => {
        setFilter(value);
    }

    let tasksAfterFiltering = tasks1;

    if (filter === 'active') {
        tasksAfterFiltering = tasks1.filter(el => !el.isDone);
    }

    if (filter === 'completed') {
        tasksAfterFiltering = tasks1.filter(el => el.isDone);
    }

    const deleteTask = (id: string) => {
        setTasks(tasks1.filter(el => el.id !== id))
    }

    const changeCheckedStatus = (id: string, isDone: boolean) => {
        setTasks(tasks1.map(el => el.id === id ? { ...el, isDone } : el))
    }

    const addNewTask = (value: string) => {
        let newTask = { id: v1(), title: value, isDone: false }
        let newTasks = [newTask, ...tasks1];
        setTasks(newTasks);
    }

    return (
        <div className='App'>
            <Todolist title={title1}
                tasks={tasksAfterFiltering}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                changeCheckedStatus={changeCheckedStatus}
                addNewTask={addNewTask}
                filter={filter}
            />

        </div>
    )
}

export default App;

