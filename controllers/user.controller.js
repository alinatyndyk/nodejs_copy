const {userService} = require("../services");
const {User} = require("../dataBase");
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
            const {user} = req;
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
            const createdUser = User.createUserWithHashPassword(req.body);

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

