const fs = require('fs');

/**
 * Update settings.
 *
 * @param text
 * @return {Promise<void>}
 */
exports.write = async function(text) {

    if (!fs.existsSync('logs')){
        fs.mkdirSync('logs');
    }

    fs.appendFileSync('logs/worker.log', text + "\n");
};

exports.read = async function() {
    return fs.readFileSync('logs/worker.log', 'utf8');
};
