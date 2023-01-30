import React from 'react';

type PropsType = {
    title: string;
    tasks: TasksType[];
}

type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}
function Todolist (props: PropsType) {
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        return <li key={el.id}><input type="checkbox" checked={el.isDone}/><span>{el.title}</span></li>
                    })}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;