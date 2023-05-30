import React, {useState} from 'react';
import {TasksType, FilterType} from "./App";

type PropsType = {
    title: string;
    tasks: TasksType[];
    deleteTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    changeCheckedStatus: (id: string) => void
    addNewTask: (value: string) => void

}


function Todolist (props: PropsType) {

    const [inputAddNewTaskValue, setInputAddNewTaskValue] = useState('');

    return (
            <div className='Todolist'>
                <h3>{props.title}</h3>
                <div>
                    <input value={inputAddNewTaskValue} onKeyUp={(e) => {
                        if(e.key === 'Enter') {
                            props.addNewTask(inputAddNewTaskValue);
                            setInputAddNewTaskValue('')
                        }
                    }} onChange={event => setInputAddNewTaskValue(event.currentTarget.value)}/>
                    <button onClick={() => {props.addNewTask(inputAddNewTaskValue); setInputAddNewTaskValue('')}}>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        return <li key={el.id} ><input type="checkbox" onChange={() => props.changeCheckedStatus(el.id)} checked={el.isDone}/><span>{el.title}</span><button onClick={() => props.deleteTask(el.id)}>[X]</button></li>
                    })}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('active')}>Active</button>
                    <button onClick={() => props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
    );
}

export default Todolist;