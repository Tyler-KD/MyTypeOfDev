import { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';



const LoginForm = (props) => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(`changing ${name} to ${value}`);

        setFormState({
            ...formState,
            [name]: value,
        });
    };

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