import React, { useState } from "react";
import { useRemoveSingleTaskMutation , useSearchTaskQuery} from "../../redux/services/api";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import classes from './tasks.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { removeSingleTask, editTask, saveCheckedTasks } from "../../redux/features/tasksReducer";

export default function TaskFunc({ item }) {
    const checkedTasks = useSelector(state=>state.tasksReducer.checkedTasks);
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const [deleteTasks, response] = useRemoveSingleTaskMutation();

    const handleRemoveSingleTask = (id) => {
        console.log('RRRRR', response);

        deleteTasks(id)
            .then((resTest) => {
                dispatch(removeSingleTask(id))
            })
            .catch((err) => console.log(err))
    }

    const toggleCheckbox = (id)=>{
        dispatch(saveCheckedTasks(id))
    }

    return (
        <Card className={`${classes.card} ${isChecked ? classes.checkedTaskCard : ''}`}>
            <input
                onChange={() => toggleCheckbox(item.id)}
                className={`${classes.cardCeckbox} m-2`}
                type="checkbox"
            />
            <Card.Body >
                <Card.Title >
                    <Link to={`/task/${item.id}`}  className={`${classes.cardTitle} text-decoration-none`} style={{color:"rgb(51,102,0)"}}>
                        {item.title}
                    </Link>
                </Card.Title>
                <Card.Text >
                    {item.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{backgroundColor:"rgb(255,178,102)"}}>
                <ListGroup.Item className={`${classes.impDev}`}>{item.importance}</ListGroup.Item>
                <ListGroup.Item className={`${classes.impDev}`}>{item.developer}</ListGroup.Item>
            </ListGroup>
            <Card.Body >
                <Button
                    className='m-2'
                    disabled={checkedTasks.length > 0}
                    variant="danger"
                    onClick={() => handleRemoveSingleTask(item.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    className='m-2'
                    disabled={checkedTasks.length > 0}
                    variant="info"
                    onClick={() => dispatch(editTask(item))}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>

            </Card.Body>
        </Card>
    )
}