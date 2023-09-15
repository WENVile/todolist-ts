import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TasksType, FilterType } from "./App";
import style from "./Todolist.module.css"
import Button from './Components/Button';

type PropsType = {
    title: string;
    tasks: TasksType[];
    deleteTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    changeCheckedStatus: (id: string, isDone: boolean) => void
    addNewTask: (value: string) => void
    filter: string

}


function Todolist(props: PropsType) {

    const [inputAddNewTaskValue, setInputAddNewTaskValue] = useState('');
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (inputAddNewTaskValue.trim() !== '') {
            props.addNewTask(inputAddNewTaskValue.trim());
            setInputAddNewTaskValue('')
        } else {
            setError('Title is requier')
        }

    }

    const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputAddNewTaskValue(event.currentTarget.value);
        setError(null);
    }

    const onChangedCheckedStatus = (checked: boolean, id: string) => {
        props.changeCheckedStatus(id, checked)
    }

    const onClickDelete = (id: string) => {
        props.deleteTask(id)
    }


    const mapped = props.tasks.map((el) => {

        return (
            <li key={el.id}
                className={el.isDone ? style.isDone : ''}>

                <input type="checkbox"
                    onChange={(event) => onChangedCheckedStatus(event.currentTarget.checked, el.id)}
                    checked={el.isDone} />

                <span>{el.title}</span>

                <Button name={'[X]'} callBack={() => onClickDelete(el.id)} />
            </li>
        )
    })


    return (
        <div className='Todolist'>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? style.error : ''}
                    value={inputAddNewTaskValue}
                    onKeyUp={onEnterPress}
                    onChange={onChangeHandler} />

                <Button name=' + ' callBack={addTask} />

                {error && <div className={style.errorMessage}>{error}</div>}
            </div>

            <ul>
                {mapped}
            </ul>

            <div>

                <Button filter={props.filter === 'all'} name={'All'} callBack={() => props.changeFilter('all')} />
                <Button filter={props.filter === 'active'} name={'Active'} callBack={() => props.changeFilter('active')} />
                <Button filter={props.filter === 'completed'} name={'Completed'} callBack={() => props.changeFilter('completed')} />
            </div>
        </div>
    );
}



export default Todolist;