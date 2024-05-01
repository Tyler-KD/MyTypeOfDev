import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../utils/mutations.js';
import { GET_ALL_POSTS } from '../utils/queries.js';
import Auth from '../utils/auth.js';

// HomePage allows users to add new posts and view all existing posts along with their comments.
const HomePage = () => {
    // useState hook used to manage the state of the text input for adding a new post.
    const [postText, setPostText] = useState('');

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

    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    // This function is executed when the "Add Post" button is clicked.
    // It checks if the user is logged in and if the username exists.
    // If so, it executes the addPost mutation with the text input and username as variables.
    const handleAddPost = async () => {
        try {
            if (Auth.loggedIn()) {
                const { data: user } = Auth.getProfile();                
                console.log(user);                

                if (user && user.username) {
                    const postAuthor = user.username;
                    const image = await user.image; // get the URL from the user's profile
                    

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

    return(
        <div className='p-4 bg-blue-500'>
            <textarea 
            value={postText} 
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Write your post here..." 
            className="w-full p-2 border border-gray-300 rounded-md"
            />

            <button onClick={handleAddPost} className='transition ease-in-out delay-150 mt-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300'>
                Add Post
            </button>

            {data.posts.slice().reverse().map((post) => {
                return (
                    <div key={post._id} className='mt-4 p-4 border border-gray-300 rounded-md'>
                        <div className='flex p-3'>{post.image && <img className="rounded-l-lg w-16 md:w-22 lg:w-30" src={post.image} alt="Post" />} {/* Display the image if it exists */}
                        {/* Map through comments if they exist */}
                        <div className='flex-initial w-20 pl-2 mt-2 text-white font-bold'><p>{post.postAuthor} posted:</p></div>
                        </div>
                        <div className='flex'><h2 className='text-xl font-bold '>{post.postText}</h2></div>
                        
                        <p className='mt-2 text-white'>Posted on: {post.createdAt}</p>
                        
                        {post.comments && post.comments.map((comment) => (
                            <div key={comment._id} className='mt-2 p-2 border border-gray-200 rounded-md'>
                                <p>{comment.commentText}</p>
                                <p className='mt-1 text-sm text-white'>Comment by: {comment.commentAuthor}</p>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default HomePage;