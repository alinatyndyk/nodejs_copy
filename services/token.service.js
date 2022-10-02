const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require("../errors");
const {tokenTypeEnum} = require("../constants");
const {ACCESS_SECRET_WORD, REFRESH_SECRET_WORD} = require("../configs/configs");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },

    createAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, {expiresIn: '10m'})
        const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, {expiresIn: '30d'})

        return {
            access_token,
            refresh_token
        }
    },

    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) =>{
        try{

            let word;
            if (tokenType === tokenTypeEnum.ACCESS) word = ACCESS_SECRET_WORD;
            if (tokenType === tokenTypeEnum.REFRESH) word = REFRESH_SECRET_WORD;

            return jwt.verify(token, word);
        }catch (e){
            throw new ApiError('token not valid', 400)
        }
    }
}