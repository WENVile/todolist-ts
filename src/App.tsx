import React, { useReducer, useState } from 'react';
import Paper from '@mui/material/Paper';

import './App.css';

import Todolist from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from './Components/AddItemForm';
import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistReducer, updateTitleTodolistAC } from './state/todolist-reducer';


export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
}


 
function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistReducer,[
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

    const removeTodoList = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId));
        delete tasks1[todolistId]
        // setTodolists(todolists.filter(el => el.id !== todolistId))
        // delete tasks1[todolistId]
        // console.log(tasks1)
    }

    const changeFilter = (value: FilterType, todolistId: string) => {
        dispatchTodolists(changeFilterAC(value, todolistId));
        // setTodolists(todolists.map(el => el.id === id ? { ...el, filter: value } : el))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({ ...tasks1, [todolistId]: tasks1[todolistId].filter(el => el.id !== taskId) })
    }

    const changeCheckedStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({ ...tasks1, [todolistId]: tasks1[todolistId].map(el => el.id === id ? { ...el, isDone } : el) })
    }

    const addNewTask = (todolistId: string, value: string) => {
        let newTask = { id: v1(), title: value, isDone: false }
        setTasks({ ...tasks1, [todolistId]: [newTask, ...tasks1[todolistId]] });
    }

    const addTodoList = (title: string) => {
        const newId = v1();
        setTasks({ ...tasks1, [newId]: []})
        dispatchTodolists(addTodolistAC(title, newId));
        
        // setTodolists([{ id: newId, title, filter: 'all' }, ...todolists])
    }

    const updateTitleItem = (todolistId: string, itemId: string, newTitle: string) => {
        setTasks({...tasks1, [todolistId]: tasks1[todolistId].map(el => el.id === itemId ? {...el, title: newTitle }: el)})
    }

    const updateTitleTodolist = (todolistId: string, newTitle: string) => {
        dispatchTodolists(updateTitleTodolistAC(todolistId, newTitle));
    }

    return (
        <div className='App'>
            
            <AddItemForm onClick={addTodoList}/>
            <div className='App-Wrapper'>
                {todolists.map(el => {

                return (
                    <Paper elevation={8}>
                        <Todolist
                            key={el.id}
                            todolistId={el.id}
                            title={el.title}
                            tasks={tasks1[el.id]}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            changeCheckedStatus={changeCheckedStatus}
                            addNewTask={addNewTask}
                            filter={el.filter}
                            removeTodolist={removeTodoList}
                            updateTitleItem={updateTitleItem}
                            updateTitleTodolist={updateTitleTodolist}/>
                    </Paper>)
            })}
            </div>
        </div>
    )
}

export default App;

