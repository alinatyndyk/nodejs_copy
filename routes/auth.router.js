const {Router} = require('express');


const {authController} = require("../controllers");
const {userMldwr, authMldwr} = require("../middlewares");

const authRouter = Router();

authRouter.post('/login',
    userMldwr.getUserDynamically('body', 'email'),
    authController.login);

authRouter.post('/logout',
    authMldwr.isAccessTokenValid,
    authController.logout);

authRouter.post('/refresh',
    authMldwr.isRefreshTokenValid,
    authController.refresh)



module.exports = authRouter;