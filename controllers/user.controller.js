const users = require("../dataBase/users");
const User = require('../dataBase/User');
const {ApiError} = require("../errors");
const {userService} = require("../services");
module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const usersFromService = await userService.getAllUsers();

            res.json(usersFromService);
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            console.log('REQUEST get users/:userId PROCESSED');
            const {userId} = req.params;
            const user = await userService.getUserById(userId);
            if (!user) {
                next(new ApiError('User with this id doesnt exist', 400))
            }

            res.json(user);

            next();
        } catch (e) {
            next(e)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const deletedUser = await userService.deleteUserById(userId);

            res.json(deletedUser);

            next();
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.createUser(req.body)

            res.json(createdUser);

            next();
        } catch (e) {
            next(e)
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const updatedUser = await userService.updateUserById(userId, req.body)

            res.json(updatedUser);

            next();
        } catch (e) {
            next(e)
        }
    }
}

