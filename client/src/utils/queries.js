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
      password
      posts {
        postText
        postAuthor
        createdAt
        comments {
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
` 