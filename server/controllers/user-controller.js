// import user and Post model
const { User, Post } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

module.exports = {
    // Fetches all users from the database and their associated posts
    async getUsers({ }, res) {
        try {
            const users = await User.find().populate('posts');
            res.json(users);
        } catch (error) {
            console.error(error);
        }
    },

    // Get a single user by either their id or their username
    async getUser({ params: { username } }, res) {
        try {
            const user = await User.findOne({ username }).populate('posts');
            res.json(user);
        } catch (error) {
            console.error(error);
        }
    },

    // Fetches all posts from the database
    async getPosts({ params: { username } }, res) {
        try {
            const params = username ? { username } : {};
            const posts = await Post.find(params).sort({ createdAt: -1 });
            res.json(posts);
        } catch (error) {
            console.error(error);
        }
    },

    // Fetches a specific post by its ID.
    async getPost({ params: { postId } }, res) {
        try {
            const post = await Post.findOne({ _id: postId })
            res.json(post);
        } catch (error) {
            console.error(error);
        }
    },

    // Fetches the currently authenticated user and their associated posts.
    async getMe({ user }, res) {
        try {
            if (user) {
                const user = await User.findOne({ _id: user._id }).populate('posts');
                res.json(user);
            } else {
                throw AuthenticationError('You need to be logged in!');
            }
        } catch (error) {
            console.error(error);
        }
    },

    // Creates a new user in the database with the data provided in the request body.
    async addUser({ body }, res) {
        try {
            const user = await User.create({ body });
            const token = signToken(user);
            res.json({ token, user });
        } catch (error) {
            console.error(error);
        }
    },

    // Login a user, sign a token, and send it back to (client/src/components/LoginForm.jsx)
    // {body} is destructured req.body
    async login({ body }, res) {
        try {
            const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
            if (!user) {
                return res.status(400).json({ message: "Can't find this user" });
            }
            const correctPw = await user.isCorrectPassword(body.password);
            if (!correctPw) {
                return res.status(400).json({ message: 'Wrong password!' });
            }
            const token = signToken(user);
            res.json({ token, user });
        } catch (error) {
            console.error(error);
        }
    },

    // Add a post to a user's 'posts' field by adding it to the set (to prevent duplicates)
    // user comes from `req.user` created in the auth middleware functtion
    async addPost({ user, body: { postText } }, res) {        
        try {
            if (user) {
                const post = await Post.create({
                    postText,
                    postAuthor: user.username,
                });
                await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { posts: post._id } }
                );
                res.json(post)
            } else {
                throw new AuthenticationError();
            }
        } catch (err) {
            console.log(err);
        }
    },

    //Adding a new like to a specified post
    async addLike ({ user, body: { likeCount }, params: { postId }}, res) {
        try {
            if (user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: {
                            likes: { likeCount, likedBy },
                        }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                res.json(updatedPost);
            } else {
                throw new AuthenticationError();
            }
        } catch (error) {
            console.error(error);
        }
    },

    // Removing a like from a specified post
    async removeLike ({ user, body: { likeCount }, params: { postId, likeId }}, res) {
        try {
            if (user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $pull: {
                            likes: { 
                                _id: likeId,
                                likeCount, 
                                likedBy,
                            },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                res.json(updatedPost);
            } else {
                throw new AuthenticationError();
            }
        } catch (error) {
            console.error(error);
        }
    },

    // Adds a new comment to a specific post. 
    async addComment({ user, body: { commentText }, params: { postId } }, res) {
        try {
            if (user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: {
                            comments: { commentText, commentAuthor: user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                res.json(updatedPost);
            } else {
                throw new AuthenticationError();
            }
        } catch (error) {
            console.error(error);
        }
    },

    // Deletes a specific post by its ID and the username of the currently authenticated user.
    async removePost({ user, params: { postId } }, res) {
        try {
            if (user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    postAuthor: user.username,
                });
                await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { posts: post._id } }
                );
                res.json(post);
            } else {
                throw new AuthenticationError();
            }
        } catch (error) {
            console.error(error);
        }
    },

    // Removes a specific comment from a specific post.
    async removeComment({ user, params: { postId, commentId } }, res) {
        try {
            if (user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: user.username,
                            },
                        },
                    },
                    { new: true }
                );
                res.json(updatedPost);
            }
        } catch (error) {
            console.error(error)
        }
    },
};