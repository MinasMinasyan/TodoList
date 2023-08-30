import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { editTask } from '../redux/features/tasksReducer';
import EditModalFunc from '../components/EditModalFunc';
import Loading from '../components/Loading/Loading';
import request from '../utils/apis'
import { useGetSingleTaskQuery } from '../redux/services/api';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;


export default function SingleTask() {
    const [taskData, setTaskData] = useState(null);
    const editedTask = useSelector((state) => state.tasksReducer.taskEditObj);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleTaskQuery(id);
    const navigate = useNavigate();


    useEffect(() => {
        if (data) {
            setTaskData(data);
        }

    }, [data])


    const handleRemoveSingleTask = (taskId) => {

        request(`${REACT_APP_URL_API}/tasks/${taskId}`, 'DELETE')
            .then(navigate('/'))
            .catch(error => console.log(error))

    }

    if (isLoading) return <Loading />

    return (


        <>
            {
                taskData &&

                <Card style={{width:"500px",marginLeft:"500px",marginTop:"100px", backgroundColor:"aquamarine"}} >
                    <Card.Body>
                        <Card.Title>
                                {taskData.title}
                        </Card.Title>
                        <Card.Text>
                            {taskData.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item style={{backgroundColor:"aquamarine"}}>{taskData.importance}</ListGroup.Item>
                        <ListGroup.Item style={{backgroundColor:"aquamarine"}}>{taskData.developer}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button
                            className='m-2'
                            variant="danger"
                            onClick={() => handleRemoveSingleTask(id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                            className='m-2'
                            variant="info"
                            onClick={() => dispatch(editTask(taskData))}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>

                    </Card.Body>
                </Card>
            }
            {
                !!editedTask && <EditModalFunc />
            }
        </>

    )
}