import { useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ME);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const { firstName, lastName, about, image, posts, applications } = data.me;

    return (
        <div className='flex flex-col mb-60 items-center justify-center min-h-screen '>
            <div className='border-b-2 border-x-2 border-orange-500'></div>
            <h1 className='text-6xl bg-orange-500 bg-opacity-80 w-1/3 text-center font-serif rounded-t-xl mt-10 animate-dropin1 '>Your Profile</h1>
            {image && <img className='border-orange-500' src={image} alt='Profile' />}
            <div className=' bg-orange-500 bg-opacity-90 rounded-b-lg border-2 border-orange-500 w-1/3 py-4 px-4 text-xl font-serif text-start'>
                <p><strong>First Name:</strong> {firstName}</p>
                <p><strong>Last Name:</strong> {lastName}</p>
                <p><strong>About Me:</strong> {about}</p>
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Applications:</h2>
                    {applications && applications.map((application, index) => (
                        <div key={index} className="mb-2">
                            <p><strong>Title:</strong> {application.title}</p>
                            {/* <p><strong>URL:</strong> {application.appURL}</p> */}
                            <p><strong></strong> <a href={application.appURL} target="_blank" rel="noopener noreferrer"><img src={application.appImageURL} alt="Application" /></a></p>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col items-center'>
                <Link to='/createprofile'>
                <button className='mt-4 px-4 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none hover:scale-125 duration-300 '>
                    Edit Profile
                </button>
                </Link>
                </div>
                
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Recent Posts:</h2>
                    {posts.slice().reverse().map((post, index) => (
                            <div key={index} className="mb-2">
                                <pre className="text-wrap whitespace-pre-wrap">{post.postText}</pre>
                                <p className='text-xs'>{post.createdAt}</p>
                            </div>
                    ))}
                </div>
                


            </div>
    
        </div>
    )
};

export default ProfilePage;