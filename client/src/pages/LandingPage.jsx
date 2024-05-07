import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';

// LandingPage displays the initial page when the application opens rendering the LoginForm and SignupForm
const LandingPage = () => {
    return (
        <div className='w-auto flex-column min-h-screen mt-16'>

            <div className='flex h-96 justify-center items-center'>
                <LoginForm />
                <SignupForm />
            </div>

        </div>
    );
};

export default LandingPage;