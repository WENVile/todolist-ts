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

type TodolistsType = {
    id: string;
    title: string;
    filter: FilterType;
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks1, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })



    const removeTodoList = (todolistId: string,) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks1[todolistId]
        console.log(tasks1)
    }

    const changeFilter = (value: FilterType, id: string) => {
        setTodolists(todolists.map(el => el.id === id ? { ...el, filter: value } : el))
    }



    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({ ...tasks1, [todolistId]: tasks1[todolistId].filter(el => el.id !== taskId) })
    }

    const changeCheckedStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({ ...tasks1, [todolistId]: tasks1[todolistId].map(el => el.id === id ? { ...el, isDone } : el) })
    }

    const addNewTask = (todolistId: string, value: string) => {
        let newTask = { id: v1(), title: value, isDone: false }
        // let newTasks = [newTask, ...tasks1];
        setTasks({ ...tasks1, [todolistId]: [newTask, ...tasks1[todolistId]] });
    }

    return (
        <div className='App'>
            {todolists.map(el => {

                return (
                    <Todolist
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasks1[el.id]}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        changeCheckedStatus={changeCheckedStatus}
                        addNewTask={addNewTask}
                        filter={el.filter}
                        removeTodolist={removeTodoList}
                    />)
            })}

        </div>
    )
}

export default App;

