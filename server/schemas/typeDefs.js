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

  type Portfolio {
    _id: ID
    title: String
    image: String
    appURL: String
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    likes: [Likes]!
    comments: [Comment]!
    image: String
  }

  type Likes {
    _id: ID
    likeCount: Int
    likedBy: String
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
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(firstName: String, lastName: String, username: String!, email: String!, password: String!): Auth
    addProfile(aboutMe: String, image: String): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!, image: String): Post
    addLike(postId: ID!, likeCount: Int!): Post
    removeLike(postId: ID!, likeId: ID!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updateProfile(about: String!, image: String!, firstName: String!, lastName: String!): User
  }
`;

module.exports = typeDefs;
