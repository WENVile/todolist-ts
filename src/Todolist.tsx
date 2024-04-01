
import { TasksType, FilterType } from "./App";
import style from "./Todolist.module.css"
import ButtonManual from './Components/ButtonManual';
import { AddItemForm } from './Components/AddItemForm';
import { EditableSpan } from "./Components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

type PropsType = {
    todolistId: string;
    title: string;
    tasks: TasksType[];
    deleteTask: (todolistId: string, id: string) => void
    changeCheckedStatus: (todolistId: string, id: string, isDone: boolean) => void
    addNewTask: (todolistId: string, value: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTitleItem: (todolistId: string, itemId: string, title: string) => void;
    updateTitleTodolist: (todolistId: string, title: string) => void;
    filter: string

}

function Todolist(props: PropsType) {
   
    let tasksAfterFiltering = props.tasks;

    if (props.filter === 'active') {
        tasksAfterFiltering = props.tasks.filter(el => !el.isDone);
    }

    if (props.filter === 'completed') {
        tasksAfterFiltering = props.tasks.filter(el => el.isDone);
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

    const addTaskHandler = (title: string) => {
        props.addNewTask(props.todolistId, title);
    }

    const updateTitleTodolist = (title: string) => {
        props.updateTitleTodolist(props.todolistId, title);
    }

    const updateTitleItem = (id: string, title: string) => {
        props.updateTitleItem(props.todolistId, id, title);
    }


    const mapped = tasksAfterFiltering.map((el) => {


        return (
            <li key={el.id}
                className={el.isDone ? style.isDone : ''}>
                
                <Checkbox checked={el.isDone} onChange={(event) => onChangedCheckedStatus(event.currentTarget.checked, el.id)} />

                <EditableSpan title={el.title} onClick={(newTitle)=>updateTitleItem(el.id, newTitle)}/>

                <IconButton size="small" aria-label="delete" onClick={() => onClickDelete(el.id)}>
                    <DeleteIcon />
                </IconButton>
            </li>
        )
    })


    return (
        <div className='Todolist'>
            <h3>
                <EditableSpan title={props.title} onClick={updateTitleTodolist}/>
                <IconButton size="small" aria-label="delete" onClick={onClickDeleteTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>

        <AddItemForm onClick={addTaskHandler}/>

            <ul>
                {mapped}
            </ul>

            <div>
                <Button className={style.filterButton} size="small" variant={props.filter === 'all' ? "outlined" : 'contained'} color="secondary" onClick={() => props.changeFilter('all', props.todolistId)}>All</Button>
                <Button className={style.filterButton} size="small" variant={props.filter === 'active' ? "outlined" : 'contained'} color="success" onClick={() => props.changeFilter('active', props.todolistId)}>Active</Button>
                <Button className={style.filterButton} size="small" variant={props.filter === 'completed' ? "outlined" : 'contained'} color="warning" onClick={() => props.changeFilter('completed', props.todolistId)}>Completed</Button>
            </div>
        </div>
    );
}



export default Todolist;