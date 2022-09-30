const {ApiError} = require("../errors");
const {userService} = require("../services");
const User = require('../dataBase/User')

module.exports = {

    uniqueUserEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;

            const user = await userService.getOneByParams({email});

            if (user && user._id.toString() !== userId) {
                return next(new ApiError('This email is already in use', 400));
            }

            next();

        } catch (e) {
            next(e)
        }
    },

    isUserPresent: (from = 'params') => async (req, res, next) => {
        try {
            const {userId} = req[from];

            const user = await userService.getUserById(userId);

            if (!user) {
                return next(new ApiError('User is not found', 400));
            }
            req.user = user;

            next();

        } catch (e) {
            next(e)
        }
    },

    getUserDynamically: (from = 'body', fieldName = 'userId', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];
            const user = await userService.getOneByParams({[dbField]: fieldToSearch});

            if (!user) {
                return next(new ApiError('User is not found', 400));
            }
            req.user = user;

            next();

        } catch (e) {
            next(e)
        }
    },
}