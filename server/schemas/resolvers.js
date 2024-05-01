
const { User, Post } = require('../models');
const UserService = require('../services/UserService');
const { signToken, AuthenticationError } = require('../utils/auth');
const formatTimestamp = require('../utils/dateFormat');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('posts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

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

    updateProfile: async (parent, args, context) => {
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { about: args.about, image: args.image, firstName: args.firstName, lastName: args.lastName } },
          {new: true}
        );
        return updatedUser;
      }
        throw new AuthenticationError('You need to be logged in!');
    },

    addPost: async (parent, args, context) => {
      if (context.user) {        
        // Fetch the user's image from the User model
        const user = await User.findOne({ _id: context.user._id });
        const userImage = user.image;
        
        const newPost = await Post.create({
          postText: args.postText,
          postAuthor: context.user.username,
          image: userImage,
          createdAt: formatTimestamp
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
