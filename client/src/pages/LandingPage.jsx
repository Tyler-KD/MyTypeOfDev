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
        

  


        <div className='flex-column mt-16'>
            
      
            <div className='flex h-96 justify-center items-center'>
                <LoginForm />
                <SignupForm />
            </div>

            <div className='flex bg-slate-900 border-t-2 mt-16'> 
                
                <img src={Tyler1} alt="Tyler" className='animate-bounce2'/>
                <img src={Ella1} alt="Ella" className='animate-bounce4'/>
                <img src={Brandon1} alt="Brandon" className='animate-bounce3'/>
                <img src={Julian1} alt="Julian" className='animate-bounce4'/>
                <img src={Yash1} alt="Yashraj" className='animate-bounce2'/>
                
            </div>
            <div className='flex-col items-center space-x-72 bg-black text-white text-center text-4xl border-y-4 py-1'>
            <p1>Tyler</p1>
            <p1>Ella</p1>
            <p1>Brandon</p1>
            <p1>Julian</p1>
            <p1>Yash</p1>
            </div>
        </div>

    );
};

export default LandingPage;