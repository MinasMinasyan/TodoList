import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import classes from './login.module.css';
import { useSignInMutation } from '../../redux/services/userApi';
import { useNavigate } from 'react-router';
import { setToken } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { setAutorization } from '../../redux/features/authReducer';
import { Link } from 'react-router-dom';

export default function LogIn() {
    const successAuto = useSelector((state) => state.userReducer.successAuthorization);
    const disppatch = useDispatch();
    const [signIn] = useSignInMutation();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });


    useEffect(() => {
        if (successAuto) {
            navigate('/');
        }
    }, [])

    const handleOnchange = (event) => {
        setLoginData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))

    }


    const handleSignIn = (e) => {
        e.preventDefault();
        const { email, password } = loginData;
        if (!email || !password) {
            return;
        }

        signIn({ password })
            .then((res) => {
                if (res.error) throw new Error('Sign in field !!!');
                if (res.data.token) {
                    disppatch(setAutorization(true));
                    setToken(res.data.token);
                    navigate('/todo');
                }
            })

    }

    return (
        <Form className="px-5" >
            <Row>
                <Col sm="12" style={{marginTop:"50px"}}>
                    <h1 className='text-center m-2'>Sign In</h1>
                </Col>
            </Row>
            <Form.Group as={Row} className="mb-3"  style={{width:"500px",marginLeft:"420px",marginTop:"50px"}}>
                <Form.Label column sm="2">Email address</Form.Label>
                <Col sm="10">
                    <Form.Control
                        value={loginData.email}
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        onChange={handleOnchange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" style={{width:"500px",marginLeft:"420px"}}>
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        value={loginData.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleOnchange} />
                </Col>
            </Form.Group>
            <p><Link to='/register' 
            style={{width:"500px",marginLeft:"520px",color:"rgb(51,102,0)"}}
            className={`${classes.loginTitle} text-decoration-none`}
            
            >Registrated ?</Link></p>
            <Button type="submit" 
            variant="info" 
            onClick={handleSignIn}
            className={classes.button}
            >Sign In</Button>
        </Form>
    )
}