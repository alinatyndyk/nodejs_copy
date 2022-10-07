const {tokenService, authService, emailService, actionTokenService, userService} = require("../services");
const {Auth} = require("../dataBase");
const {sendEmail} = require("../services/email.service");
const {WELCOME, FORGOT_PASSWORD} = require("../constants/emailActionEnum");
const {tokenTypeEnum, constants} = require("../constants");
const {FRONTEND_URL} = require("../configs/configs");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {password, email} = req.body;
            const {password: hashPassword, _id, name} = req.user;

            await tokenService.comparePasswords(password, hashPassword);
            const authTokens = tokenService.createAuthTokens({_id});
            console.log(authTokens);

            await authService.saveTokens({...authTokens, user: _id});
            // await sendEmail(email, WELCOME, {userName: name});
            await sendEmail(email, FORGOT_PASSWORD, {userName: name});

            res.json({
                ...authTokens, user: req.user
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {user, refresh_token} = req.tokenInfo;

            await authService.deleteOneByParams({refresh_token});

            const authTokens = tokenService.createAuthTokens({_id: user});

            const newTokens = await authService.saveTokens({...authTokens, user});

            res.json(newTokens);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user, access_token} = req.tokenInfo;
            console.log(user);
            await authService.deleteOneByParams({user, access_token});


            res.json('Logout page');
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, email} = req.user;

            const actionToken = tokenService.createActionToken(tokenTypeEnum.FORGOT_PASSWORD, {_id});

            const url = `${FRONTEND_URL}/password/forgot-pass-page?tokenAction=${actionToken}`
            await emailService.sendEmail(email, FORGOT_PASSWORD, {url});
            await actionTokenService.createActionToken({
                tokenType: tokenTypeEnum.FORGOT_PASSWORD,
                user: _id,
                token: actionToken
            })


            res.json('OK')
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordForgot: async (req, res, next) => {
        try {
            const {user} = req.tokenInfo;
            const {password} = req.body;
            const token = req.get(constants.AUTHORIZATION)

            await authService.deleteManyByParams({user: user._id});
            await actionTokenService.deleteActionToken({token});

            const hashPassword = await tokenService.hashPassword(password)
            await userService.updateUserById(user._id, {password: hashPassword})

            res.json('OK');
        } catch (e) {
            next(e);
        }

    }


}