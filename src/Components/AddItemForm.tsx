import React, { useState } from "react";
import style from "../Todolist.module.css"
import { ChangeEvent, KeyboardEvent} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



type PropsType = {
    onClick: (value: string) => void;

}

export const AddItemForm = ( props: PropsType) => {

     
    const [inputAddNewTaskValue, setInputAddNewTaskValue] = useState('');
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (inputAddNewTaskValue.trim() !== '') {
            props.onClick(inputAddNewTaskValue.trim());
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

    return(
        <div className='addItemFormWrapper'>

                <TextField id="outlined-basic" size="small" variant="outlined"
                          label={error ? error : "New Todolist"} 
                           error={!!error}
                           value={inputAddNewTaskValue}
                           onKeyUp={onEnterPress} 
                           onChange={onChangeHandler}  />
                
                <Button className={style.button} variant="contained" onClick={addTask}>+</Button>
                
            </div>

    )
}  