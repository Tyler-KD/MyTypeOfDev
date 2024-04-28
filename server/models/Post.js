const { Schema, model } = require('mongoose');
const formatTimestamp = require('../utils/dateFormat');

const postSchema = new Schema({
  postText: {
    type: String,
    required: 'You need to type something here',
    minlength: 1,
    maxlength: 280,
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
