const {AUTHORIZATION} = require("../constants/constants");
const {ApiError} = require("../errors");
const {authService, tokenService, actionTokenService} = require("../services");
const {REFRESH} = require("../constants/tokenType.enum");

module.exports = {

    isAccessTokenValid: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);
            if (!access_token) {
                return next(new ApiError('You are unauthorized. No access token', 401))
            }

            tokenService.checkToken(access_token)

            const tokenInfo = authService.getOneWithUser({access_token});

            if (!tokenInfo) {
                return next(new ApiError('no valid token', 401))
            }
            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e)
        }
    },

    isRefreshTokenValid: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            if (!refresh_token) {
                return next(new ApiError('You are unauthorized. No refresh token', 401))
            }

            tokenService.checkToken(refresh_token, REFRESH);

            const tokenInfo = await authService.getOneByParams({refresh_token});

            if (!tokenInfo) {
                return next(new ApiError('No valid refresh token', 401));
            }

            req.tokenInfo = tokenInfo;

            next();

        } catch (e) {
            next(e)
        }
    },

    isActionTokenValid: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION)
            tokenService.checkToken(token, tokenType);

            if (!token) {
                return next(new ApiError('No action token', 401))
            }

            const tokenInfo = await actionTokenService.getOneBySearchParamsWithUser({tokenType, token});

            if(!tokenInfo){
                return next(new ApiError('no valid token', 401))
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e)
        }
    }
}