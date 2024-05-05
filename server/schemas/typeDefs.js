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
    applications: [Application]
    posts: [Post]
  }

  type Application {
    title: String
    appURL: String
    appImageURL: String
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

  input ApplicationInput {
    title: String
    appURL: String
    appImageURL: String
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
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updateProfile(about: String!, image: String!, firstName: String!, lastName: String!, applicationData: ApplicationInput): User
  }
`;

module.exports = typeDefs;
