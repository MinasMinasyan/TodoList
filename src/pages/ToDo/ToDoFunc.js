import React, { useEffect, useState } from "react";
import { useGetAllTasksQuery, useSearchTaskQuery } from "../../store/api";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../../store/tasksReducer";
import Loading from "../../components/Loading/Loading";
import TaskFunc from "../../components/Tasks/TaskFunc";
import Confirm from "../../components/Confirm"
import EditModalFunc from "../../components/EditModalFunc";
import SearchTaskDropDown from "../../components/SearchDropDown/SearchDropdown";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddNewTaskModalFunc from "../../components/AddNewTask/AddNewTaskModalFunc";
import { useDebounce } from "../../customHook";



export default function ToDoFunc() {
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { data, isError, isLoading } = useGetAllTasksQuery();
    const debounced = useDebounce(searchText)

    const { data: searchResults } = useSearchTaskQuery(debounced);
    const dispatch = useDispatch();
    const taskData = useSelector((state) => state.tasksReducer.toDoList);
    const editedTask = useSelector((state) => state.tasksReducer.taskEditObj);
    const checkedTasks = useSelector((state)=>state.tasksReducer.checkedTasks);


    useEffect(() => {
        if (data) {
            dispatch(getAllTasks(data));
        }
    }, [data])


    const toogleMOdal = () => {
        setShowNewTaskModal(prev => !prev)
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <>
            {isLoading && <Loading />}
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center mt-5">
                        <Button
                            variant="info"
                            className="w-25"
                            onClick={() => { setShowNewTaskModal(prev => !prev) }}
                            disabled={checkedTasks.length > 0}
                        >
                            Add task
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="text-center mt-5" lg="3">
                        <input type="search" value={searchText} onChange={handleSearchChange} />
                    </Col>
                </Row>
                {
                    searchResults && <Row className="justify-content-center">
                        <Col className="text-center mt-2" lg="3">
                            <SearchTaskDropDown tasks={searchResults} />
                        </Col>
                    </Row>
                }


                <Row className="mt-5">
                    {

                        taskData?.map((item) => {
                            return (
                                <Col key={item.id} sm="12" md="6" lg="4" xl="3">
                                    <TaskFunc item={item} />
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row className="justify-content-center" >
                    <Button
                        onClick={()=>setToggleConfirmModal(prev=>!prev)}
                        variant="danger"
                        className="w-25 mt-5"
                        disabled={checkedTasks.length <= 0}
                    >Remove checked tasks</Button>

                </Row>
                <Confirm
                    show={toggleConfirmModal}
                    onHide={()=>setToggleConfirmModal(false)}
                />
                {
                    !!editedTask &&
                    <EditModalFunc
                    />
                }
                {
                    showNewTaskModal &&
                    <AddNewTaskModalFunc
                        onClose={toogleMOdal}
                    />
                }
            </Container>
        </>)
}