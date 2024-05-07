import React, { useEffect, useState } from 'react'
import Yash1 from '../assets/PEOPLE/Yash1.png';
import Brandon1 from '../assets/PEOPLE/Brandon1.png';
import Ella1 from '../assets/PEOPLE/Ella1.png';
import Julian1 from '../assets/PEOPLE/Julian1.png';
import Tyler1 from '../assets/PEOPLE/Tyler1.png';




const Creators = () => {


    return (


        <div className=' flex flex-col py-5 min-h-screen'>
            <div className='p-3 m-2 flex justify-center'>
                <div className=' text-4xl font-bold mb-5' id='creatorTitle'>Who The Hell Made This?</div>
            </div>
            <div className='px-5 py-5 bg-orange-400'>
                <h1 className='font-bold'>Our Story:</h1>
                <p className='py-3 '>
                    This application will be a social media hub for developers, where they can create their own portfolio, share their creations, and chat with fellow code enthusiasts! We’re kicking off this application by inviting our classmates to hop on board, crafting their own adorable lil profiles. DevHub is where we can stay connected, swap cool app ideas, and sprinkle in some coding tips for others to see.

                    After navigating to devHub, users will immediately be brought to the login page. From here, the user is given an option of logging in or creating a login. Creating a login prompts the user to enter in their name, email, and password. From here, the user will be directed to their profile page to write a little about themselves, and upload a profile picture. Once the user hits save they are then brought to their public profile that other users can see.

                    From here users have the freedom to explore their feed, other users profiles, comment and like posts. Our ultimate goal is to extend access to devHub to any developer who wants a space to share their own coding magic.

                </p>

            </div>


            <div className='p-3 m-3 flex'>
                <div className=' text-4xl font-bold' id='creators'>Blame Them...</div>
            </div>
            <div className=''>

                <p className='py-3'>
                    <div className='flex justify-center 2xl:flex-row items-center '>

                        <a href="https://github.com/Tyler-KD" target="_blank"><img src={Tyler1} alt="Tyler" className='animate-bounce2 hover:animate-none hover:scale-150 hover:-translate-y-10' /></a>


                        <a href="https://github.com/mymashedpotatoes" target="_blank"><img src={Ella1} alt="Ella" className='animate-bounce4 hover:animate-none hover:scale-150 hover:-translate-y-10' /></a>


                        <a href="https://github.com/LILKEYKEY17" target="_blank"><img src={Brandon1} alt="Brandon" className='animate-bounce3 hover:animate-none hover:scale-150 hover:-translate-y-10' /></a>


                        <a href="https://github.com/jpalomo92" target="_blank"><img src={Julian1} alt="Julian" className='animate-bounce4 hover:animate-none hover:scale-150 hover:-translate-y-10' /></a>


                        <a href="https://github.com/yoboyyash" target="_blank"><img src={Yash1} alt="Yashraj" className='animate-bounce2 hover:animate-none hover:scale-150 hover:-translate-y-10' /></a>

                    </div>

                    <div className='flex 2xl:flex-row 2xl:space-x-72 2xl:justify-center text-white text-center text-xl  animate-slidein2 '>
                        <p1>Tyler</p1>
                        <p1>Ella</p1>
                        <p1>Brandon</p1>
                        <p1>Julian</p1>
                        <p1>Yash</p1>
                    </div>

                    
                </p>

            </div>


        </div>
    );

}

export default Creators;
