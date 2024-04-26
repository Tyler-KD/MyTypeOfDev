import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Button, Form, FormGroup } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AppNavbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        devHub
                    </Navbar.Brand>
                    <Nav className='ml-auto'>
                        <Button variant='primary' onClick={handleShow}>
                            Login/Signup
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="login">
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="login">
                            <LoginForm />
                        </Tab.Pane>

                        <Tab.Pane eventKey="signup">
                            <SignupForm />
                        </Tab.Pane>
                    </Tab.Content>


                </Tab.Container>

            </Modal>

        </>
    );
};

export default AppNavbar