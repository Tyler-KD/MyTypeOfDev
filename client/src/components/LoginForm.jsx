import { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// LoginForm allows a user to log into the application
const LoginForm = (props) => {
    // The useState hook is used to create formState, which is an object that holds the email and password entered by the user.
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    // The useMutation hook from Apollo Client is used to prepare the LOGIN_USER mutation.
    // This mutation will be sent to the GraphQL server when the user submits the form.
    const [login, { error, data }] = useMutation(LOGIN_USER);
    // The handleChange function updates formState whenever the user types into the form fields.
    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(`changing ${name} to ${value}`);

        setFormState({
            ...formState,
            [name]: value,
        });
    };
    // The handleSubmit function is called when the user submits the form.
    // It sends the LOGIN_USER mutation to the server with the current formState as variables.
    // If the mutation is successful, the user is logged in using the Auth.login function, and then redirected to the home page.
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await login({
                variables: { ...formState },
            });
            console.log(data);
            Auth.login(data.login.token);

            window.location.href = '/home';
        } catch (e) {
            console.error(e);
        }
    };
    
    // Returns a form that the user can fill out to log in.
    // If the data variable is truthy (LOGIN_USER mutation has completed successfully), a success message is displayed.
    // Otherwise, the login form is displayed.
    return (
        <>
            {data ? (
                <p>success {' '}
                    <Link to='/home'></Link>
                </p>
            ) : (

                    <form id="dropDown" onSubmit={handleSubmit} className="flex flex-col items-center text-white w-1/4 h-full p-2 rounded-3xl border-2 animate-dropin1" >
                        <div className="flex flex-col items-center animate-gradient animated-background2 w-full h-full rounded-3xl border-white border-4">

                        <h2 className='text-center font-bold mb-6 mt-6 text-3xl'>Login</h2>
                            <div className="mb-2">
                                <label className="block text-xl">Email Address</label>
                                <input type="email" name="email" placeholder="Enter email" value={formState.email} onChange={handleChange} 
                                className="mt-1 block w-full rounded-md text-black border-4 border-gray-600 shadow-2xl" />
                            </div>

                        <div className="mb-2">
                            <label className="block text-xl">Password</label>
                            <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange}
                            className="mt-1 block w-full rounded-md text-black border-4 border-gray-600 shadow-2xl" />
                        </div>

                        <button type="submit" className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-125 ease-in-out">
                            Login
                        </button>
                        </div>

                    </form>
            )}
            {error && (
                <p>{error.message}</p>
            )}
        </>
    )
}

export default LoginForm;