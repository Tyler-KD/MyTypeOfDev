import Yash1 from '../assets/PEOPLE/Yash1.png';
import Brandon1 from '../assets/PEOPLE/Brandon1.png';
import Ella1 from '../assets/PEOPLE/Ella1.png';
import Julian1 from '../assets/PEOPLE/Julian1.png';
import Tyler1 from '../assets/PEOPLE/Tyler1.png';

const Footer = () => {

    return (
        <footer className="flex-col text-xl text-center ">

            

            <span className='flex flex-row justify-center justify-stretch'>

                <p className="w-1/2 bg-black text-white text-center">Brought to you by: <span className="text-red-400 font-bold">Yash's Chosen Ones! &#10084; </span></p>

                <p className="w-1/2 bg-black text-white ">devHub &copy; {new Date().getFullYear()}</p>

            </span>

        </footer>
    )
};


export default Footer;