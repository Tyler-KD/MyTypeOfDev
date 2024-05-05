import { useEffect, useState } from 'react';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { ADD_POST } from '../utils/mutations.js';
import { GET_ALL_POSTS, GET_ME, GET_USER_BY_USERNAME } from '../utils/queries.js';
import { TfiComment } from "react-icons/tfi";
import { VscHeart } from "react-icons/vsc";
import Auth from '../utils/auth.js';
import { Link } from 'react-router-dom';


// HomePage allows users to add new posts and view all existing posts along with their comments.
const HomePage = () => {
    const [codeView, setCodeView] = useState(false);

    // const handleAddPost = () => {
    //     // Add the post with the current value of postText and codeView
    //     // Reset postText and codeView
    //     setPostText('');
    //     setCodeView(false);
    // };

    const client = useApolloClient();
    // useState hook used to manage the state of the text input for adding a new post.
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([]);

    // useMutation hook used to execute the ADD_POST mutation
    const [addPost] = useMutation(ADD_POST, {
        // update function used to manually update the Apollo Client cache after the mutation is executed.
        update(cache, { data: { addPost } }) {
            try {
                // Read the data from our cache for this query.
                // This query is used to fetch all posts.
                const existingPosts = cache.readQuery({ query: GET_ALL_POSTS });

                // Create a new object with the existing posts and the new post
                const newPosts = { posts: [...existingPosts.posts, addPost] };

                // Write our data back to the cache.
                cache.writeQuery({ query: GET_ALL_POSTS, data: newPosts });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS);

    // useEffect hook runs whenever the data changes (i.e., whenever the GET_USER_BY_USERNAME query finishes loading)
    useEffect(() => {
        const fetchPosts = async () => {
            // First, refetch the posts
            await refetch();

            const updatedPosts = await Promise.all(data.posts.map(async post => {
                const { data: userData } = await client.query({ query: GET_USER_BY_USERNAME, variables: { username: post.postAuthor } });
                return { ...post, image: userData.user.image };
            }));

            setPosts(updatedPosts);
        };
        if (data && data.posts) {
            fetchPosts();
        }
    }, [data, client, refetch]);

    //const { me } = useQuery({ query: GET_ME});
    // This function is executed when the "Add Post" button is clicked.
    // It checks if the user is logged in and if the username exists.
    // If so, it executes the addPost mutation with the text input and username as variables.
    const handleAddPost = async () => {
        // Add the post with the current value of postText and codeView
        // Reset postText and codeView
        setPostText('');
        setCodeView(false);
        try {
            if (Auth.loggedIn()) {
                const { data: userData } = await client.query({ query: GET_ME });
                const user = userData.me;
                console.log(user);

                if (user && user.username) {
                    const postAuthor = user.username;
                    const image = user.image; // get the URL from the user's profile


                    await addPost({ variables: { postText, postAuthor, image } });
                    setPostText('');
                } else {
                    console.error('User or username is undefined');
                }
            } else {
                console.error('User is not authenticated');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // If the GET_ALL_POSTS query is still loading, a loading message is displayed.
    // If there's an error with the query, an error message is displayed.
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;



    console.log(data);
    return (
        <div className='p-4'>
            <div className='flex flex-col items-center p-4 bg-slate-800 bg-opacity-50 rounded-full'>
                <h1 className='text-6xl bg-orange-500 bg-opacity-80 w-1/3 text-center font-serif rounded-t-xl animate-dropin1 '>The dHub Feed</h1>

                <div className='flex flex-row w-full h-full ml-28 justify-center'>

                    <textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        placeholder="Write your post here..."
                        className="w-1/2 p-2 mx-5 border-4 border-black shadow-2xl" />

                    <div className='flex flex-col w-1/12'>
                        <button onClick={handleAddPost} className='transition ease-in-out delay-150 px-4 py-2 mt-4 bg-indigo-600 text-xl text-white rounded-md hover:scale-125 hover:bg-indigo-500 duration-300'>
                            Add Post
                        </button>

                        <button onClick={() => setCodeView(!codeView)} className='transition ease-in-out delay-150 px-4 py-2 mt-4 
                        bg-indigo-600 text-xl text-white rounded-md hover:scale-125 hover:bg-indigo-500 duration-300'>
                            Toggle Code View
                        </button>
                    </div>

                </div>
            </div>





            <div className='flex flex-col items-center justify-center'>
                {posts.slice().reverse().map((post) => {
                    return (

                        <div key={post._id} className='w-1/2 flex-col items-center'>


                            <div className='flex flex-col  w-full mt-12 p-2 border-2 border-gray-900 rounded-md'>
                                <div key={post._id} to={`/post/${post._id}`} className='flex flex-col items-center'>

                                    <div className='flex flex-col w-full border-2 border-gray-900 rounded-md bg-orange-500 bg-opacity-90'>

                                        {/* Check if the logged-in user is the author of the post */}
                                        <Link to={Auth.getProfile().data.username === post.postAuthor ? `/profile` : `/profile/${post._id}`}>
                                            <div className='flex'>{post.image && <img className="rounded-l-lg w-16 md:w-22 lg:w-30" src={post.image} alt="Post" />} </div>
                                        </Link>
                                        {/* Display the image if it exists */}
                                        {/* Map through comments if they exist */}


                                        <div><p className='text-black font-bold text-3xl ml-2'>{post.postAuthor}<span className='text-black text-xl'>:</span></p></div>


                                        <Link to={`/post/${post._id}`}>
                                            <div className='flex'>
                                                {codeView ? <pre className='text-2xl text-wrap whitespace-pre-wrap ml-2 mt-3'>{post.postText}</pre> : <h2 className='text-2xl ml-2 mt-3'>{post.postText}</h2>}
                                            </div>
                                        </Link>

                                        <p className='mt-5 mx-2 text-white text-end'>Posted on, {post.createdAt}</p>

                                        <div className='flex flex-row text-xl '>


                                            <span className='ml-2'>{post.comments.length}</span>
                                            {post.comments && (<button className='ml-1'><TfiComment /></button>)}


                                            <span className='likes ml-5'>0 likes</span>
                                            <button className='likes ml-1'><VscHeart /></button>



                                        </div>





                                    </div>




                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;