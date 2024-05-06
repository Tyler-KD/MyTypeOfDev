const { Schema, model } = require('mongoose');
const formatTimestamp = require('../utils/dateFormat');
const { ObjectId } = require('mongodb');

const postSchema = new Schema({
  postText: {
    type: String,
    required: 'You need to type something here',
    minlength: 1,
    maxlength: 1000,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatTimestamp,
  },
  image: {
    type: String,
    trim: true,
  },
  likes: [
    { 
      likeCount: {
        type: Number,
        required: true,
      },
      likedBy: {
        type: String,
        required: true,
      },
    },
  ],
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: formatTimestamp,
      },
    },
  ],
}, {
  timestamps: true,
});

const Post = model('Post', postSchema);

module.exports = Post;
