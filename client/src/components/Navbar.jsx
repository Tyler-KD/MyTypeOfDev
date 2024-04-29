import { NavLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import image1 from '../assets/dev-Hub_1 copy.png';
import Auth from '../utils/auth';

const Navbar = () => {

    // function to handle logging out
    const handleLogout = () => {
        Auth.logout(); // log the user out
    };

    return (
        <div className='flex flex-col justify-between'>
            <nav className='flex items-center justify-between bg-black rounded-b-3xl shadow-lg px-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    {/* If user is logged in, show the Home, Profile, and Logout navigation links */}
                    {Auth.loggedIn() ? (
                        <>
                            <h1 className='text-white text-xl lg:text-2xl transition-all duration-200 hover:scale-110'>
                                <NavLink to='/home' className='font-bold'>
                                    <img className='h-auto w-[200px]' src={image1} />
                                </NavLink>
                            </h1>
                            <ul className='text-white font-medium hidden lg:flex lg:items-center lg:justify-center lg:space-x-10 text-2xl'>
                                <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/home" activeclassname="selected">Home</NavLink></li>
                                <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/profile" activeclassname="selected">Profile</NavLink></li>
                                <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink onClick={handleLogout} activeclassname="selected">Logout</NavLink></li>
                            </ul>
                        </>
                    ) : (
                        // If user is logged out, only show the devHub landingpage link
                        <h1 className='text-white text-xl lg:text-2xl transition-all duration-200 hover:scale-110'>
                            <NavLink to='/' className='font-bold'>
                                <img className='h-auto w-[200px]' src={image1} />
                            </NavLink>
                        </h1>
                    )}

                </div>
            </nav>


        </div>

    );
};

export default Navbar