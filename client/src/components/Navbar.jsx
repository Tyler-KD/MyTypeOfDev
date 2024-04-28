import { NavLink } from 'react-router-dom';
import image1 from '../assets/dev-Hub_1.png';

const Navbar = () => {
    
    return (
        <div className='flex flex-col justify-between'>
            <nav className='flex items-center justify-between h-44 lg:h-44 bg-black rounded-b-3xl shadow-lg px-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-white text-xl lg:text-2xl transition-all duration-200 hover:scale-110'>
                        <NavLink to='/' className='font-bold'> 
                            <img src={image1}/>  
                        </NavLink>
                    </h1>
                </div>
            </nav>
        
        </div>

    );
};

export default Navbar