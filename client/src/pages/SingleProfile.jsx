import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID, GET_USER_BY_USERNAME } from '../utils/queries';

// SingleProfilePage displays a single post's associated user profile.
const SingleProfilePage = () => {
  const { postId } = useParams();
  // The useState hook is used to create a state variable codeView which is used to toggle between normal text view and code view for the posts.
  const [codeView, setCodeView] = useState(false);

  // The GET_POST_BY_ID query fetches the post using the postId obtained from the URL parameters.
  const { loading: postLoading, error: postError, data: postData } = useQuery(GET_POST_BY_ID, {
    variables: { postId },
  });

  const postAuthorUsername = postData?.post?.postAuthor;

  // The GET_USER_BY_USERNAME query fetches the user details using the postAuthorUsername obtained from the post data.
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: postAuthorUsername },
  });

  if (postLoading || userLoading) return <p>Loading...</p>;
  if (postError) return <p>Error: {postError.message}</p>;
  if (userError) return <p>Error: {userError.message}</p>;

  console.log(userData);

  // Returns a layout that displays the user's profile information and their recent posts.
  // Profile information includes their first name, last name, about section, image, and applications.
  return (
    <div className='flex flex-col items-center justify-center '>
      <h1 className='text-6xl bg-orange-500 bg-opacity-80 w-1/3 text-center font-serif rounded-t-xl mt-10 animate-dropin1'>User Profile</h1>
      <div className='bg-orange-500 bg-opacity-90 rounded-b-lg border-2 border-orange-500 w-1/3 py-4 px-4 text-xl font-serif text-start'>
        <p><strong>First Name:</strong> {userData?.user?.firstName}</p>
        <p><strong>Last Name:</strong> {userData?.user?.lastName}</p>
        <p><strong>About Me:</strong> {userData?.user?.about}</p>
        {userData?.user?.image && <img className='mt-4 rounded' src={userData?.user?.image} alt='Profile' />}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-xl font-bold mb-2">Applications:</h2>
          {userData?.user?.applications && userData.user.applications.map((application, index) => (
            <div key={index} className="mb-2">
              <p><strong>Title:</strong> {application.title}</p>
              <p><strong></strong> <a href={application.appURL} target="_blank" rel="noopener noreferrer"><img className=" hover:opacity-70" src={application.appImageURL} alt="Application" /></a></p>
            </div>
          ))}
          {/* The codeView state variable is used to conditionally render the posts in a <pre> tag (for code view) or a <p> tag (for normal view). */}
          {/* The setCodeView function is used to toggle the codeView state when the "Code View" button is clicked. */}
          <button onClick={() => setCodeView(!codeView)} className="mx-auto mt-4 px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none hover:scale-125 duration-300">Code View</button>
        </div>

        <div className="mt-4">

          <h2 className="text-xl font-bold mb-2">Recent Posts</h2>
          {userData?.user?.posts.slice().reverse().map((post, index) => (
            <div key={index} className="mb-2">
              {codeView ? <pre className='text-wrap whitespace-pre-wrap'>{post.postText}</pre> : <p>{post.postText}</p>}
              <p>{post.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default SingleProfilePage;