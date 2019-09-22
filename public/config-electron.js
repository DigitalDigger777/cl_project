const path = require('path');

module.exports = Object.freeze({
    timeoutSendHash: 10 * 60, // each 10 minutes
    timeoutCalcHash: 30, // each 30 seconds re-calc hash in database
    version: '2.0',
    db: path.resolve('.',  'prod.db')
});
