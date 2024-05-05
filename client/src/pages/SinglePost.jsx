import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID, GET_USER_BY_USERNAME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT, REMOVE_POST, REMOVE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth.js';


const SinglePostPage = () => {
    const { postId } = useParams();
    const { loading: postLoading, error: postError, data: postData } = useQuery(GET_POST_BY_ID, {
        variables: { postId }
    });

    const postAuthorUsername = postData?.post?.postAuthor;

    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_USERNAME, {
        variables: { username: postAuthorUsername },
    });

    const [commentText, setCommentText] = useState('');
    const [showCommentForm, setShowCommentForm] = useState(false);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const [addComment] = useMutation(ADD_COMMENT);
    const [removePost] = useMutation(REMOVE_POST);
    const [removeComment] = useMutation(REMOVE_COMMENT);

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
            window.location.href = '/home';
        } catch (error) {
            console.error('Error removing post:', error);
        }
    };

    const handleRemoveComment = async (commentId) => {
        try {
            console.log(commentId);
            await removeComment({ variables: { postId, commentId } });
        } catch (error) {
            console.error('Error removing comment:', error);
        }
    };

    if (postLoading || userLoading) return <p>Loading...</p>;
    if (postError) return <p>Error: {postError.message}</p>;
    if (userError) return <p>Error: {userError.message}</p>;

    const post = postData.post;
    // console.log(data.post);
    // console.log(post.comments);

    return (
        <div className="p-4 flex flex-col items-center">
            <div className="flex flex-col w-1/2 bg-orange-500 bg-opacity-90 text-center items-center pb-4 font-serif rounded-xl">
                <div className="flex items-center mb-4">
                    <img src={userData?.user?.image} alt="Post" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                        <h1 className="text-xl font-bold">{post.postAuthor}</h1>
                        <p className="text-gray-600">{post.createdAt}</p>
                    </div>
                </div>
                <pre className="text-2xl font-bold mb-4 text-wrap whitespace-pre-wrap">{post.postText}</pre>
                <hr className="my-4" />
                <h3 className="text-lg font-bold mb-2">Comments</h3>
                {post.comments.map(comment => (
                    <div key={comment._id} className="border border-gray-300 rounded-md p-4 mb-4">
                        <pre className="text-gray-700 text-wrap whitespace-pre-wrap">{comment.commentText}</pre>
                        <p className="text-sm text-gray-500 mt-2">Comment by: {comment.commentAuthor}</p>
                        {Auth.loggedIn() && Auth.getProfile().data.username === comment.commentAuthor && (
                            <button
                                onClick={() => handleRemoveComment(comment._id)} // Pass in comment._id
                                className="mt-2 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-500"
                            >
                                Remove Comment
                            </button>
                        )}
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