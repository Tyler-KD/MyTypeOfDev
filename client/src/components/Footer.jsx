import Yash1 from '../assets/PEOPLE/Yash1.png';
import Brandon1 from '../assets/PEOPLE/Brandon1.png';
import Ella1 from '../assets/PEOPLE/Ella1.png';
import Julian1 from '../assets/PEOPLE/Julian1.png';
import Tyler1 from '../assets/PEOPLE/Tyler1.png';




const Footer = () => {
    
    return (
        <footer className="flex-col text-2xl text-center 2xl:fixed bottom-0 left-0 right-0">

            <div className='flex flex-col 2xl:flex-row items-center bg-slate-900 border-t-2 mt-16'> 
                
                <a href="https://github.com/Tyler-KD" target="_blank"><img src={Tyler1} alt="Tyler" className='animate-bounce2 hover:animate-none hover:scale-150 hover:-translate-y-20'/></a>
                <a href="https://github.com/mymashedpotatoes" target="_blank"><img src={Ella1} alt="Ella" className='animate-bounce4 hover:animate-none hover:scale-150 hover:-translate-y-20'/></a>
                <a href="https://github.com/LILKEYKEY17" target="_blank"><img src={Brandon1} alt="Brandon" className='animate-bounce3 hover:animate-none hover:scale-150 hover:-translate-y-20'/></a>
                <a href="https://github.com/jpalomo92" target="_blank"><img src={Julian1} alt="Julian" className='animate-bounce4 hover:animate-none hover:scale-150 hover:-translate-y-20'/></a>
                <a href="https://github.com/yoboyyash" target="_blank"><img src={Yash1} alt="Yashraj" className='animate-bounce2 hover:animate-none hover:scale-150 hover:-translate-y-20'/></a>
                
            </div>
            
            <div className='flex flex-col 2xl:flex-row 2xl:space-x-72 2xl:justify-center bg-black text-white text-center text-4xl border-y-4 py-1 animate-slidein2 '>
                <p1>Tyler</p1>
                <p1>Ella</p1>
                <p1>Brandon</p1>
                <p1>Julian</p1>
                <p1>Yash</p1>
            </div>
           
            <div className='flex flex-row justify-center animate-popin1'>

                <p1 className="w-1/3 bg-black text-white text-center border-x-4 border-b-4">Brought to you by: <span className="text-red-400 font-bold">Yash's Chosen Ones! &#10084; </span></p1>
            
                <p1 className="w-1/3 bg-black text-white border-x-4 border-b-4">devHub &copy; {new Date().getFullYear()}</p1> 

            </div>
            
            
            
           
        </footer>
    )
}


export default Footer;