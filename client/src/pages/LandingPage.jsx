// LandingPage.js
import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';
import Yash1 from '../assets/PEOPLE/Yash1.png';
import Brandon1 from '../assets/PEOPLE/Brandon1.png';
import Ella1 from '../assets/PEOPLE/Ella1.png';
import Julian1 from '../assets/PEOPLE/Julian1.png';
import Tyler1 from '../assets/PEOPLE/Tyler1.png';

const LandingPage = () => {
    return (
        

  


        <div className='flex'>
            
            <div className=''> 
                
                <img src={Tyler1} alt="Tyler"/>
                <img src={Ella1} alt="Ella"/>
                <img src={Brandon1} alt="Brandon"/>
                <img src={Julian1} alt="Julian"/>
                <img src={Yash1} alt="Yashraj"/>
                
            </div>
            <div className='flex flex-grow h-screen justify-center items-center'>
                <LoginForm />
                <SignupForm />
            </div>
        </div>

    );
};

export default LandingPage;