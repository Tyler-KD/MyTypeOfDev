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

    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(`changing ${name} to ${value}`); // Debugging log
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            console.log(data);
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            {data ? (
                <div>
                    <p>success</p>
                    <Link to='/'>homepage link</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/3 h-1/2 p-2 bg-blue-500 rounded-3xl border-2 ms-36">
                    <h2 className='text-center font-bold mb-6 text-3xl'>Sign Up</h2>
                    <div className="mb-2">
                        <label className="block text-xl">Username</label>
                        <input type="text" name="username" placeholder="Enter username" value={formState.username} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>

                    <div className="mb-2">
                        <label className="block text-xl">Email Address</label>
                        <input type="email" name="email" placeholder="Enter email" value={formState.email} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>

                    <div className="mb-2">
                        <label className="block text-xl">Password</label>
                        <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign Up
                    </button>
                </form>
            )}
            {error && (
                <p>{error.message}</p>
            )}
        </>
    )
}

export default SignupForm;