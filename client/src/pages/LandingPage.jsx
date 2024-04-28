// LandingPage.js
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
        <div className='flex flex-col justify-between'>
            <Navbar />
            <div className='flex flex-grow h-screen justify-center items-center'>
                <LoginForm />
                <SignupForm />
            </div>
            <Footer />
        </div>

    );
};

export default LandingPage;