import { NavLink } from 'react-router-dom';
import  LoginForm  from './LoginForm';
import  SignupForm  from './SignupForm';
import image1 from '../assets/dev-Hub_1 copy.png';

const Navbar = () => {

    return (
        <div className='flex flex-col justify-between'>
            <nav className='flex items-center justify-between bg-black rounded-b-3xl shadow-lg px-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-white text-xl lg:text-2xl transition-all duration-200 hover:scale-110'>
                        <NavLink to='/' className='font-bold'>
                            <img className='h-auto w-[200px]' src={image1} />
                        </NavLink>
                    </h1>
                </div>
            </nav>


        </div>

    );
};

export default Navbar