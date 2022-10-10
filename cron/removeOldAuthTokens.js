const {authService} = require('../services');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

module.exports = () => {
    try{
        const oneMonthBeforeNow = dayjs().utc().add(-1, 'month');
        return authService.deleteManyByParams({
            createdAt: {$lte: oneMonthBeforeNow}
        })

    }catch (e){
        console.log(e);
    }
}