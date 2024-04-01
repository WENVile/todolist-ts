import React from 'react'
import style from '../Todolist.module.css'

type PropsType = {
    name: string,
    callBack: () => void
    filter?: boolean
}


function ButtonManual(props: PropsType) {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button className={props.filter ? style.activeFilter : ''} onClick={onClickHandler}>{props.name}</button>
    )
}

export default ButtonManual
