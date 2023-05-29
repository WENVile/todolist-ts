import React from 'react';
import {TasksType} from "./App";

type PropsType = {
    title: string;
    tasks: TasksType[];
    deleteTask: (id: number) => void
}


function Todolist (props: PropsType) {
    return (
            <div className='Todolist'>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        return <li key={el.id}><input type="checkbox" checked={el.isDone}/><span>{el.title}</span><button onClick={() => props.deleteTask(el.id)}>[X]</button></li>
                    })}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    );
}

export default Todolist;