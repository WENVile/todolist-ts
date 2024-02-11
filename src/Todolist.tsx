import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TasksType, FilterType } from "./App";
import style from "./Todolist.module.css"
import Button from './Components/Button';

type PropsType = {
    todolistId: string;
    title: string;
    tasks: TasksType[];
    deleteTask: (todolistId: string, id: string) => void
    changeCheckedStatus: (todolistId: string, id: string, isDone: boolean) => void
    addNewTask: (todolistId: string, value: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: string

}


function Todolist(props: PropsType) {
    
    const [inputAddNewTaskValue, setInputAddNewTaskValue] = useState('');
    const [error, setError] = useState<string | null>(null)

    let tasksAfterFiltering = props.tasks;

    if (props.filter === 'active') {
        tasksAfterFiltering = props.tasks.filter(el => !el.isDone);
    }

    if (props.filter === 'completed') {
        tasksAfterFiltering = props.tasks.filter(el => el.isDone);
    }


    const addTask = () => {
        if (inputAddNewTaskValue.trim() !== '') {
            props.addNewTask(props.todolistId, inputAddNewTaskValue.trim());
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
        props.changeCheckedStatus(props.todolistId, id, checked)
    }

    const onClickDelete = (id: string) => {
        props.deleteTask(props.todolistId, id)
    }

    const onClickDeleteTodolist = () => {
        props.removeTodolist(props.todolistId)
    }


    const mapped = tasksAfterFiltering.map((el) => {

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
            <h3>{props.title}
                <button onClick={onClickDeleteTodolist}>X</button>
            </h3>

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

                <Button filter={props.filter === 'all'} name={'All'} callBack={() => props.changeFilter('all', props.todolistId)} />
                <Button filter={props.filter === 'active'} name={'Active'} callBack={() => props.changeFilter('active', props.todolistId)} />
                <Button filter={props.filter === 'completed'} name={'Completed'} callBack={() => props.changeFilter('completed', props.todolistId)} />
            </div>
        </div>
    );
}



export default Todolist;