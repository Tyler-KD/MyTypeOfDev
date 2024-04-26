import { Form, Button } from 'react-bootstrap';

const SignupForm = () => {
    return (
        <Form>
            <Form.Group controlId='formBasicUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='username' placeholder='Enter username' />

            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Signup
            </Button>
        </Form>
    )
}

export default SignupForm;