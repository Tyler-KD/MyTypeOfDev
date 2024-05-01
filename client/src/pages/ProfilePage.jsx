import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ME);
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>;
    console.log(data);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-4xl font-bold mb-8 bg-blue-500'>Your Profile</h1>
            <div className='w-full max-w-sm bg-blue-500'>
                <p><strong>First Name:</strong> {data.me.firstName}</p>
                <p><strong>Last Name:</strong> {data.me.lastName}</p>
                <p><strong>About Me:</strong> {data.me.about}</p>
                {data.me.image && <img className='mt-4 rounded' src={data.me.image} alt='Profile' />}

            </div>
            <Link to='/createprofile'>
                <button className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                    Edit Profile
                </button>
            </Link>
        </div>
    )
};

export default ProfilePage;