import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT, REMOVE_POST, REMOVE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth.js';


const SinglePostPage = () => {
    const { postId } = useParams();
    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: { postId }
    });

    const [commentText, setCommentText] = useState('');
    const [showCommentForm, setShowCommentForm] = useState(false);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const [addComment] = useMutation(ADD_COMMENT);
    const [removePost] = useMutation(REMOVE_POST);

    const handleCommentSubmit = async () => {
        try {
            if (Auth.loggedIn()) {
                const { data: user } = Auth.getProfile();
                // console.log(user.username);

                if (user && post) {
                    const commentAuthor = user.username;
                    const postId = post._id;

                    await addComment({ variables: { postId, commentText, commentAuthor } });
                    // console.log('Comment submitted:', commentText);
                    setCommentText('');
                    setShowCommentForm(false);
                } else {
                    console.error('User or username is undefined');
                }
            } else {
                console.error('User is not authenticated');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleRemovePost = async () => {
        try {
            await removePost({ variables: { postId } });
            window.location.href = '/profile';
        } catch (error) {
            console.error('Error removing post:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const post = data.post;
    // console.log(data.post);
    // console.log(post.comments);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                    <img src={post.image} alt="Post" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                        <h1 className="text-xl font-bold">{post.postAuthor}</h1>
                        <p className="text-gray-600">{post.createdAt}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">{post.postText}</h2>
                <hr className="my-4" />
                <h3 className="text-lg font-bold mb-2">Comments</h3>
                {post.comments.map(comment => (
                    <div key={comment._id} className="border border-gray-300 rounded-md p-4 mb-4">
                        <p className="text-gray-700">{comment.commentText}</p>
                        <p className="text-sm text-gray-500 mt-2">Comment by: {comment.commentAuthor}</p>
                    </div>
                ))}
                {showCommentForm ? (
                    <div className="mt-4">
                        <textarea
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder="Write your comment..."
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="mt-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowCommentForm(true)}
                        className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-indigo-500"
                    >
                        Add Comment
                    </button>
                )}
                {Auth.loggedIn() && Auth.getProfile().data.username === post.postAuthor && (
                    <button
                        onClick={handleRemovePost}
                        className="mt-4 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-500"
                    >
                        Remove Post
                    </button>
                )}
            </div>
        </div>
    );
};

export default SinglePostPage;