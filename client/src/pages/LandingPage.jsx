// LandingPage.js
import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';


const LandingPage = () => {
    return (
        

  


        <div className='w-auto flex-column mt-16'>
            
      
            <div className='flex h-96 justify-center items-center'>
                <LoginForm />
                <SignupForm />
            </div>

   
        </div>

    );
};

export default LandingPage;