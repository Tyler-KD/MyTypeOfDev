import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ME);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const { firstName, lastName, about, image, posts } = data.me;

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-4xl font-bold mb-8 bg-blue-500'>Your Profile</h1>
            <div className='w-full max-w-sm bg-blue-500'>
                <p><strong>First Name:</strong> {firstName}</p>
                <p><strong>Last Name:</strong> {lastName}</p>
                <p><strong>About Me:</strong> {about}</p>
                {image && <img className='mt-4 rounded' src={image} alt='Profile' />}
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Recent Posts</h2>
                    {posts.slice().reverse().map((post, index) => (
                            <div key={index} className="mb-2">
                                <p>{post.postText}</p>
                                <p>{post.createdAt}</p>
                            </div>
                    ))}
                </div>
            </div>
            <Link to='/createprofile'>
                <button className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'>
                    Edit Profile
                </button>
            </Link>
        </div>
    )
};

export default ProfilePage;