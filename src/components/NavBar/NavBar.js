import classes from './navBar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { removeToken } from '../../utils/utils';
import { setAutorization } from '../../redux/features/authReducer';
import { getToken } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
    const successAuto = useSelector(state => state.userReducer.successAuthorization);
    const disppatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        disppatch(setAutorization(false));
        removeToken();
        if(!getToken()){
            navigate('/')
        }

    }

    return (
        <Navbar expand="lg" className={`${classes.navbarContainer}`} >
            <Container >
                <Navbar.Brand >
                    <Link to={'/todo'} className={classes.navBarItem}>
                        ToDo
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Link to="/" className={classes.navBarItem}>
                            Home
                        </Link>
                        <Link to="/about" className={classes.navBarItem}>
                            About
                        </Link>
                    </Nav>
                </Navbar.Collapse>
                {
                    successAuto ?
                        <Button onClick={handleSignOut} className={`${classes.signIn}`}>Sign out</Button>
                        :
                        <Button className={classes.signIn}>
                            <Link to='/signin' className={`${classes.signInLink} `}>
                                Sing in
                            </Link>
                        </Button>
                }
            </Container>
        </Navbar>

    )
}