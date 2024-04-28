import Navbar from "./Navbar";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

// Header component styles the header and links the Navbar component
const Header = () => {
    return (
        <header className="sm:px-4 mx-auto max-w-[1600px]">

            <Navbar />

            <div className='flex flex-grow h-screen justify-center items-center'>
                <LoginForm />
                <SignupForm />
            </div>

        </header>
    )
}

export default Header;