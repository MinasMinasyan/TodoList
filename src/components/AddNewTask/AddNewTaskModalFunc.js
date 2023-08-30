import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAddNewTaskMutation } from '../../redux/services/api';
import { addNewTask, setSuccessMessage, setErrorMessage } from '../../redux/features/tasksReducer';


export default function AddNewTaskModalFunc({ onClose }) {
    const titleInputRef = useRef();
    const [addNewTaskRequest, response] = useAddNewTaskMutation();
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState({
        title: "",
        importance: "",
        developer: "",
        description: "",

    });

    useEffect(()=>{
        titleInputRef.current.focus();
    },[])

    const handleInputChange = (event) => {

        setInputFields(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

    }

    const handleRadioChange = (event) => {
        const newFormData = {
            ...inputFields,
            importance: event.target.name,
        };
        setInputFields(newFormData);
    }


    const handleAddKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddNewTask(event);
        }

    }
    const handleAddNewTask = (event) => {
        event.preventDefault();

        if(!inputFields.title) return;
        addNewTaskRequest(inputFields)
            .then((res) => {
                if(res.error) throw new Error('Something went wrong !!!');
               dispatch(addNewTask(res.data));
               dispatch(setSuccessMessage(`Task ${res.data.title} succesfully added !!!`));
               onClose();

            }
            )
            .catch((error) => {
                dispatch(setErrorMessage('Task did not added !!!'))
                console.log(error)
            })
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new task
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form onKeyDown={handleAddKeyDown}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Titleppp
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={inputFields.titleRef}
                                onChange={handleInputChange}
                                ref={titleInputRef}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                        <Form.Label column sm={2}>
                            Description
                        </Form.Label>
                        <Col sm={10}>

                            <Form.Control
                                controlId="floatingTextarea"
                                as="textarea"
                                placeholder="Leave a comment here"
                                name="description"
                                value={inputFields.description}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Developer
                        </Form.Label>

                        <Col sm={10}>
                            <Form.Select aria-label="Default select example" name="developer" value={inputFields.developer} onChange={handleInputChange}>
                                <option value="">Select a developer</option>
                                <option value="Aksana">Aksana</option>
                                <option value="Hovo">Hovo</option>
                                <option value="Vardges">Vardges</option>
                                <option value="Armen">Armen</option>
                                <option value="ELizabet">Elizabet</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Radios
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="low"
                                    name="low"
                                    id="formHorizontalRadios1"
                                    checked={inputFields.importance === "low"}
                                    onChange={handleRadioChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="medium"
                                    name="medium"
                                    id="formHorizontalRadios2"
                                    checked={inputFields.importance === "medium"}
                                    onChange={handleRadioChange}

                                />
                                <Form.Check
                                    type="radio"
                                    label="high"
                                    name="high"
                                    id="formHorizontalRadios3"
                                    checked={inputFields.importance === "high"}
                                    onChange={handleRadioChange}

                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={handleAddNewTask}>Add</Button>
                <Button variant="secondary" onClick={onClose}>Cansel</Button>
            </Modal.Footer>
        </Modal>
    )
}