import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { REMOVE_APPLICATION } from "../utils/mutations";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs"

// ProfilePage displays the user's profile information
const ProfilePage = () => {
    // GET_ME query fetches the current user's profile information.
    const { loading, error, data } = useQuery(GET_ME, {
        // fetchPolicy: "network-only" tells the Apollo Client to always fetch the latest data from the server and skip the cache without refreshing the page.
        fetchPolicy: "network-only"
    });
    // REMOVE_APPLICATION mutation removes the current user's application by its applicationId.
    const [RemoveApplication] = useMutation(REMOVE_APPLICATION, {refetchQueries: [GET_ME, "me"] })
    // useState hook is used to create a state variable codeView which is used to toggle between normal text view and code view for the posts.
    const [codeView, setCodeView] = useState(false);
    // If the GET_ME query is still loading, a loading message is displayed.
    // If there's an error with the query, an error message is displayed.
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const { firstName, lastName, about, image, posts, applications } = data.me;

    // Returns a layout that displays the user's profile information.
    // The map function is used to iterate over the applications and posts arrays and create a new array of JSX elements.
    return (
        <div className='flex flex-col mb-60 items-center justify-center min-h-screen '>
            <div className='border-b-2 border-x-2 border-orange-500'></div>
            <h1 className='text-6xl bg-orange-400 bg-opacity-100 w-1/3 text-center font-serif rounded-t-xl mt-10 animate-dropin1 '>Your Profile</h1>
            {image && <img className='bg-orange-400 bg-opacity-100 border-2 border-orange-400 w-1/3 py-4 px-4 text-xl font-serif text-start' src={image} alt='Profile' />}
            <div className='bg-orange-400 bg-opacity-100 rounded-b-lg border-2 border-orange-400 w-1/3 py-4 px-4 text-xl font-serif text-start'>
            {/* {image && <img className='border-zinc-500 rounded-lg flex' src={image} alt='Profile' />} */}
                <p><strong>First Name:</strong> {firstName}</p>
                <p><strong>Last Name:</strong> {lastName}</p>
                <p><strong>About Me:</strong> {about}</p>
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Applications:</h2>
                    {applications && applications.map((application, index) => (
                        <div key={index} className="mb-2">
                            <BsTrash3 className="cursor-pointer" onClick={async () => {
                                alert(application._id)
                                await RemoveApplication({
                                    variables: {applicationId: application._id}
                                })
                            }} />
                            <p><strong></strong> {application.title}</p>
                            <p><strong></strong> <a href={application.appURL} target="_blank" rel="noopener noreferrer"><img className=" hover:opacity-70" src={application.appImageURL} alt="Application" /></a></p>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Link to='/createprofile'>
                        <button className='mt-4 px-4 py-2 rounded text-white bg-zinc-700 hover:bg-zinc-800 focus:outline-none hover:scale-125 duration-300 '>
                            Edit Profile
                        </button>
                    </Link>
                    {/* The codeView state variable is used to conditionally render the posts in a <pre> tag (for code view) or <p> tag (for normal view). */}
                    {/* The setCodeView function is used to toggle the codeView state when the "Code view" button is clicked. */}
                    <button onClick={() => setCodeView(!codeView)} className="mx-auto mt-4 px-4 py-2 rounded text-white bg-zinc-700 hover:bg-zinc-800 focus:outline-none hover:scale-125 duration-300">Code View</button>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Recent Posts:</h2>
                    {posts.slice().reverse().map((post, index) => (
                        <div key={index} className="mb-2">
                            {codeView ? <pre className="text-wrap whitespace-pre-wrap">{post.postText}</pre> : <p>{post.postText}</p>}
                            <p className='text-xs'>{post.createdAt}</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
};

export default ProfilePage;