const {ApiError} = require("../errors");

module.exports = {
    userIdMldw: async (req, res, next) => {
        try {
            // console.log(req.params)
            const {userId} = req.params;
            // console.log(userId, 'userId fro mldwr')

            if (Number.isNaN(+userId) || userId < 0) {
                throw new ApiError('nit valid useId', 400)
            }

            next();

        } catch (e) {
            next(e)
        }
    },
}