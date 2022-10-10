module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/default',

    ACCESS_SECRET_WORD: process.env.ACCESS_WORD || 'ACCESS_WORD',
    REFRESH_SECRET_WORD: process.env.REFRESH_WORD || 'REFRESH_WORD',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'alinatyndyk777@gmail.com',
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || 'pvrgyuzvinkuzcio',

    FRONTEND_URL: process.env.FRONTEND_URL || 'google.com',

    ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_WORD|| 'ACTION_TOKEN',

}