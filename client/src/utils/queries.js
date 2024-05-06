import { gql } from "@apollo/client";

// Sends a request to the GraphQL server to fetch the specified data for the currently authenticated user.
// The me field in the query represents the currently authenticated user.
// The posts field is an array of post objects.
// The returned data can then be used to display a list of the user's saved posts and comments.
export const GET_ME = gql`
{
    me {
      _id
      firstName
      lastName
      email
      username
      about
      image
      applications {
        _id
        title
        appURL
        appImageURL
      }
      posts {
        postText
        postAuthor
        createdAt
        likes {
          likeCount
          likedBy
        }
        comments {
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

// Fetches all posts and their associated comments.
export const GET_ALL_POSTS = gql`
query posts {
  posts {
    _id
    postText
    postAuthor
    createdAt
    image
    likes {
      _id
      likeCount
      likedBy
    }
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

// Fetches a single post by its Id.
// Returns that single post's data and saved list of comments.
export const GET_POST_BY_ID = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      _id
      postAuthor
      postText
      image
      createdAt
      likes {
        _id
        likeCount
        likedBy
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// Fetches a single user by its username.
// Returns all the profile data for that single user, a list of saved applications, a list of saved posts, and a list of saved comments.
export const GET_USER_BY_USERNAME = gql`
query user($username: String!) {
  user(username: $username) {
    _id
      firstName
      lastName
      email
      username
      about
      image
      applications {
        title
        appURL
        appImageURL
      }
      posts {
        postText
        postAuthor
        createdAt
        likes {
          likeCount
          likedBy
        }
        comments {
          commentText
          commentAuthor
          createdAt
        }
      }
  }
}`;