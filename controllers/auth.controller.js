const {tokenService, authService} = require("../services");
const {Auth} = require("../dataBase");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword, _id} = req.user;

            await tokenService.comparePasswords(password, hashPassword);
            const authTokens = tokenService.createAuthTokens({_id});
            console.log(authTokens);

            await authService.saveTokens({...authTokens, user: _id});

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
}