// LandingPage.js
import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';

const LandingPage = () => {
    return (
        
        <div className='flex flex-col justify-between'>
            <div className='flex flex-grow h-screen justify-center items-center'>
                <LoginForm />
                <SignupForm />
            </div>
        </div>

    );
};

export default LandingPage;