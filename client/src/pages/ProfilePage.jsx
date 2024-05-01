import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';


const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ME);
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>;
    console.log(data);

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='bg-blue-500'>        
                <h1 className='text-4xl font-bold mb-8'>Your Profile</h1>
                <div className='w-full max-w-sm'>
                    <p><strong>First Name:</strong> {data.me.firstName}</p>
                    <p><strong>Last Name:</strong> {data.me.lastName}</p>
                    <p><strong>About Me:</strong> {data.me.about}</p>
                    {data.me.image && <img className='mt-4 rounded' src={data.me.image} alt='Profile' />}

                </div>
            </div>
    
            
        </div>
    )
};

export default ProfilePage;