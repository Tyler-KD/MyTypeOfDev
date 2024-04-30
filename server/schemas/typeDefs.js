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

  type Profile {
    _id: ID
    aboutMe: String
    image: String
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
    addCard(url: String!, image: String!): Card
    addPost(postText: String!): Post
    addComment(commentId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updateProfile(about: String!, image: String!, firstName: String!, lastName: String!): User
  }
`;

module.exports = typeDefs;
