// UserService.js
const User = require('../models/User') ; // Import User model

const UserService = {
    updateUser: async (userId, update) => {
        try {
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            if(update.about !== undefined) {
                user.about = update.about;
            }
            if(update.image !== undefined) {
                user.image = update.image;
            }
            if(update.firstName !== undefined) {
                user.firstName = update.firstName;
            }
            if(update.lastName !== undefined) {
                user.lastName = update.lastName;
            }

            // Save the updated user
            const updatedUser = await user.save();

            return updatedUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

module.exports = UserService;