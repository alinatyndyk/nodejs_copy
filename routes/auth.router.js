const {Router} = require('express');


const {authController} = require("../controllers");
const {userMldwr, authMldwr} = require("../middlewares");
const {tokenTypeEnum} = require("../constants");

const authRouter = Router();

authRouter.post('/login',
    userMldwr.userBodyValid('loginUserValidator'),
    userMldwr.getUserDynamically('body', 'email'),
    authController.login);

authRouter.post('/logout',
    authMldwr.isAccessTokenValid,
    authController.logout);

authRouter.post('/refresh',
    authMldwr.isRefreshTokenValid,
    authController.refresh);

authRouter.post('/password/forgot',
    userMldwr.userBodyValid('userEmailValidator'),
    userMldwr.getUserDynamically('body', 'email'),
    authController.forgotPassword);

authRouter.put('/password/forgot',
    userMldwr.userBodyValid('userEmailValidator'),
    authMldwr.isActionTokenValid(tokenTypeEnum.FORGOT_PASSWORD),
    authMldwr.checkPreviousPassword,
    authController.setNewPasswordForgot);


module.exports = authRouter;