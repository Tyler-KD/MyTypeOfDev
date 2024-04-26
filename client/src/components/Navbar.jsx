import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

const AppNavbar = () => {
    return (
        <>
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>
                    devHub
                </Navbar.Brand>

            </Container>

        </Navbar>
        
        </>
    );
};

export default AppNavbar