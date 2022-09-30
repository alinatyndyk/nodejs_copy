const {isObjectIdOrHexString} = require("mongoose");

const {ApiError} = require("../errors");

module.exports = {
    validIdMldwr: (fieldName, from = 'params') => async (req, res, next) => {
        try {
            if (isObjectIdOrHexString(req[from][fieldName])) {
                return next( new ApiError('nit valid useId', 400));
            }

            next();

        } catch (e) {
            next(e)
        }
    },
}