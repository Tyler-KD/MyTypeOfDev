const { User, Post } = require('../models');
const UserService = require('../services/UserService');
const { signToken, AuthenticationError } = require('../utils/auth');
const formatTimestamp = require('../utils/dateFormat');

// Resolvers provide the instructions for turning a GraphQL operation into data.
// They resolve the query to the actual data from the database.
// Query resolvers fetch data from the database.
// Mutation resolvers modify data in the database.
const resolvers = {
  Query: {
    // Fetches all users.
    users: async () => {
      return User.find().populate('posts');
    },
    // Fetches a single user by username.
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts');
    },
    // Fetches all posts or posts by a specific user.
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: 1 });
    },
    // Fetches a single post by ID.
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    // Fetches the profile of the currently authenticated user.
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // Creates a new user.
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Authenticates a user and returns a token.
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    // Updates a user's profile.
    updateProfile: async (parent, args, context) => {
      console.log(args.applicationData);
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { about: args.about, image: args.image, firstName: args.firstName, lastName: args.lastName } },
          {new: true}
        );
        await User.findOneAndUpdate({
          _id: context.user._id
        },{
          $push: {applications: args.applicationData}
        })
        return updatedUser;
      }
        throw new AuthenticationError('You need to be logged in!');
    },

    // Adds a new post.
    addPost: async (parent, args, context) => {
      if (context.user) {        
        // Fetch the user's image from the User model
        const user = await User.findOne({ _id: context.user._id });
        const userImage = user.image;
        
        const newPost = await Post.create({
          postText: args.postText,
          postAuthor: context.user.username,
          image: userImage
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { posts: newPost._id } },
          { new: true }
        );

        return newPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Adds a new comment to a post.
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    // Deletes a post.
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw AuthenticationError;
    },

    // Removes a comment from a post.
    removeComment: async (parent, { postId, commentId }, context) => {      
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
