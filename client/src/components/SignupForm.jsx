import { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';


const SignupForm = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    // When the ADD_USER mutation is succesful, it returns a JWT(JSON Web Token) that encodes the user's information in a payload, which is then signed by the server.
    // This token is sent back to the client and can be used to authenticate subsequent requests from the client.
    // The Auth.login function takes this token as an argument, and stores the token on the client side, such as local storage or a cookie.
    // This allows the token to be included in the headers of subsequent requests to authenticate the user.
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(`changing ${name} to ${value}`); // Debugging log
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    // If mutation is successful, the user is logged in using the Auth.login function, and then redirected to the create profile page.
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            console.log(data);
            Auth.login(data.addUser.token);

            window.location.href = '/createprofile';
        } catch (e) {
            console.error(e);
        }
    }
    
    // If the data variable is truthy (ADD_USER mutation has completed successfully), a success message is displayed.
    // Otherwise, the signup form is displayed.
    return (
        <>
            {data ? (
                <p>success {' '}
                    <Link to='/createprofile'></Link>
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col items-center text-white w-1/4 h-full p-2 rounded-3xl border-2 ms-36 animate-dropin1">
                    <div className="flex flex-col items-center animate-gradient animated-background w-full h-full rounded-3xl border-white border-4">
                    <h2 className='text-center font-bold mb-6 mt-6 text-3xl'>Sign Up</h2>
                    <div className="mb-2">
                        <label className="block text-xl">Username</label>
                        <input type="text" name="username" placeholder="Enter username" value={formState.username} onChange={handleChange}
                            className="mt-1 block w-full rounded-md text-black border-4 border-gray-600 shadow-2xl" />
                    </div>

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
                    <button type="submit" className="mt-2 px-4 py-2 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-125 ease-in-out">
                        Sign Up
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

export default SignupForm;