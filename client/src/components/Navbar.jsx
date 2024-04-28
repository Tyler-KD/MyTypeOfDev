import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import image1 from '../assets/dev-Hub_1.png';

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className='flex flex-col h-screen justify-between'>
            <nav className='flex items-center justify-between h-14 lg:h-44 bg-black rounded-b-3xl shadow-lg px-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-white text-xl sm:text-2xl transition-all duration-200 hover:scale-110'>
                        <NavLink to='/' className='font-bold'> <img src={image1}/>  </NavLink>
                    </h1>
                </div>
            </nav>
            <div className='flex flex-grow justify-center items-center mt-10'>
                <LoginForm />
                <SignupForm />
            </div>
        </div>

    );
};

export default Navbar