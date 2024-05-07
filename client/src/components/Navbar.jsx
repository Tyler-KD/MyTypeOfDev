import { NavLink } from 'react-router-dom';
import image1 from '../assets/dev-Hub_1 copy.png';
import Auth from '../utils/auth';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import "./Navbar.css"
import Notifications from "../assets/Notifications.png"

const Navbar = ({socket, user}) => {

    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }

    // function to handle logging out
    const handleLogout = () => {
        Auth.logout(); // log the user out
    };

    // const handleNotifications = (type) => {
    //     Socket.emit("sendNotification", {
    //         senderName:user,
    //         receiverName: post.username,
    //         type,
    //     });
    // };

    // const [notifications, setNotifications] = useState([])

    // useEffect(()=>{
    //     socket.on("getNotification", (data)=>{
    //         setNotifications((prev) => [...prev, data])
    //     })
    // },[socket]);

    // const displayNotification = ({ senderName, type }) => {
    //     let action;
    
    //     if (type === 1) {
    //       action = "liked";
    //     } else if (type === 2) {
    //       action = "commented";
    //     } 
    //     return (
    //       <span className="notification">{`${senderName} ${action} your post.`}</span>
    //     );
    //   };

    //   const handleRead = () => {
    //     setNotifications([]);
    //     setOpen(false);
    //   };

    // console.log(notifications)

    return (
        <div className='flex flex-col justify-between'>
            <nav className='flex items-center justify-between bg-black rounded-b-3xl shadow-lg px-4'>
                <div className='container mx-auto flex justify-between items-center '>
                    {/* If user is logged in, show the Home, Profile, and Logout navigation links */}
                    {Auth.loggedIn() ? (
                        <>
                            <h1 className='text-white text-xl lg:text-2xl transition-all duration-200 hover:scale-110 animate-slidein1'>
                                <NavLink to='/home' className='font-bold'>
                                    <img className='h-auto w-[200px]' src={image1} />
                                </NavLink>
                            </h1>
                            <ul className='text-white font-medium hidden lg:flex lg:items-center lg:justify-center lg:space-x-10 text-2xl'>
                                <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/home" activeclassname="selected">Home</NavLink></li>
                                <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/profile" activeclassname="selected">Profile</NavLink></li>
                                <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/creators" activeclassname="selected">Creators</NavLink></li>
                                <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink onClick={handleLogout} activeclassname="selected">Logout</NavLink></li>
                                <div className='icon'>
                                    <img src={Notifications} className='iconImg' alt=''/>
                                    <div className='counter'>3</div>
                                </div>
                            </ul>
                        </>
                    ) : (
                        // If user is logged out, only show the devHub landingpage link
                        <h1 className='text-white text-xl lg:text-2xl transition-all duration-200 hover:scale-110 animate-slidein1'>
                            <NavLink to='/' className='font-bold'>
                                <img className='h-auto w-[200px]' src={image1} />
                            </NavLink>
                        </h1>
                    )}

                </div>

                {/* On small screen, dropdown menu will be shown */}
                {/* On medium screen and above, it will be hidden */}
                <section onClick={handleNav} className='block md:hidden text-white z-40 cursor-pointer'>
                    {/* Ternary operator: If nav is true, then the AiOutlineClose icon will display */}
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}

                    <section className={nav ? 'z-30 text-gray-300 fixed left-0 top-0 w-full bg-[#202121] ease-in-out duration-500'
                        : 'fixed left-[-100%]'}>
                        {/* If user is logged in, show the Home, Profile, and Logout navigation links */}
                        {Auth.loggedIn() ? (
                            <>
                                <h2 className='text-3xl gray-primary-color m-4'>
                                    <NavLink to='/home' className='font-bold'>
                                        <img className='h-auto w-[200px]' src={image1} />
                                    </NavLink>
                                </h2>
                                <ul className='p-8 text-4xl ml-20'>
                                    <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/home" activeclassname="selected">Home</NavLink></li>
                                    <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/profile" activeclassname="selected">Profile</NavLink></li>
                                    <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink to="/creators" activeclassname="selected">Creators</NavLink></li>
                                    <li className='p-2 transition-all duration-200 hover:scale-110'><NavLink onClick={handleLogout} activeclassname="selected">Logout</NavLink></li>
                                </ul>
                            </>
                        ) : (
                            // If user is logged out, only show the devHub landingpage link
                                <h2 className='text-3xl gray-primary-color m-4'>
                                    <NavLink to='/' className='font-bold'>
                                        <img className='h-auto w-[200px]' src={image1} />
                                    </NavLink>
                                </h2>
                        )};
                    </section>
                </section>
            </nav>
        </div>
    );
};

export default Navbar;