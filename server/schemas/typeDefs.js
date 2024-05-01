const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    about: String
    image: String
    username: String
    email: String
    password: String
    posts: [Post]
  }

  type Card {
    _id: ID
    url: String
    image: String
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
    image: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(firstName: String, lastName: String, username: String!, email: String!, password: String!): Auth
    addProfile(aboutMe: String, image: String): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!, image: String): Post
    addComment(commentId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updateProfile(about: String!, image: String!, firstName: String!, lastName: String!): User
  }
`;

module.exports = typeDefs;
