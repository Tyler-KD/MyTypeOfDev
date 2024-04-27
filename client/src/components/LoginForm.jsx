import React, { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/3 p-4 bg-red-500 rounded shadow" >
            <h2 className='text-center font-bold mb-4'>Login</h2>
            <div className="mb-2">
                <label className="block">Email address</label>
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div className="mb-2">
                <label className="block">Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
                className="mt-1 block w-full rounded-md border-r-gray-300 shadow-sm" />
            </div>
            <button type="submit" className="mt-2 px-4 py-2 border border-transparent text-sm font-medium 
            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Login
            </button>
        </form>
    )
}

export default LoginForm;