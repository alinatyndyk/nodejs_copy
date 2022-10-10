const cron = require('node-cron');

const removeOldAuthTokens = require('./removeOldAuthTokens')

module.exports = () => {
    cron.schedule('*/10 * * * * *', removeOldAuthTokens)
}