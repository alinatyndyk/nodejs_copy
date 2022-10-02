const {Router} = require('express');

const {userController} = require("../controllers");
const {userMldwr, commonMldwr, authMldwr} = require("../middlewares");

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId',
    commonMldwr.validIdMldwr('useId', 'params'),
    authMldwr.isAccessTokenValid,
    userMldwr.isUserPresent(),
    userController.getUserById);

userRouter.post('/',
    userMldwr.userBodyValid,
    userMldwr.uniqueUserEmail,
    userController.createUser);

userRouter.put('/:userId',
    commonMldwr.validIdMldwr('useId', 'params'),
    authMldwr.isAccessTokenValid,
    userMldwr.isUserPresent(),
    userMldwr.uniqueUserEmail ,
    userController.updateUserById);

userRouter.delete('/:userId',
    commonMldwr.validIdMldwr('useId', 'params'),
    authMldwr.isAccessTokenValid,
    userMldwr.isUserPresent(),
    userController.deleteUser);


module.exports = userRouter;