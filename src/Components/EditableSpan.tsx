import React, { ChangeEvent, useState } from "react";


type PropsType = {
    title: string
    onClick: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState(props.title);
    const [status, setStatus] = useState(false);

    const changeStatus = () => {
        setStatus(!status)
        if(status) props.onClick(newTitle);
    }

    const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
        let title = event.currentTarget.value;
        setNewTitle(title);
    }
 
    return (
        status 
        ?   <input value={newTitle} onKeyUp={event => event.key === 'Enter' ? changeStatus() : null} onBlur={changeStatus} onChange={changeInput} autoFocus/>
        :   <span onDoubleClick={changeStatus}>{props.title}</span>

    )
}