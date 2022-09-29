const {Router} = require('express');

const {userController} = require("../controllers");
const {userMldwr} = require("../middlewares");

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userMldwr.userIdMldw,userController.getUserById);

userRouter.post('/', userController.createUser);

userRouter.put('/:userId', userController.updateUserById);

userRouter.delete('/:userId', userController.deleteUser);


module.exports = userRouter;