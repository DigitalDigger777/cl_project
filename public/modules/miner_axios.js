const axios = require('axios');
const request = require('request');
// const DigestClient = require('digest-client');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//exports = module.exports = Miner;

function doRequest(url, username, password) {
    return new Promise(function (resolve, reject) {
        request(url, {
            'auth': {
                'user': username,
                'pass': password,
                'sendImmediately': false
            }
        }, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

/**
 * Hash calculate.
 *
 * @param ip
 * @param username
 * @param password
 * @return {Promise<*>}
 * @deprecated
 */
exports.hashCalculate = async function(ip, username, password) {
    return new Promise(function (resolve, reject) {
        let iterator = 0;
        let hash = 0;
        const timer = setInterval(async function () {
            try {
                const status = await exports.getMinerStatus(ip, username, password);
                hash = status.ant_ghs5s * 5 * 1000000000;
                // hash = 4728 * 5 * 1000000000;

                if (iterator === 12) {
                    clearInterval(timer);

                    resolve(hash);
                }
                iterator++;
            } catch (e) {
                reject(e.toString());
            }

        }, 5000);
    });

};

/**
 * Send request to miner and get miner status.
 *
 * @param ip
 * @param username
 * @param password
 * @return {Promise<{ant_ghs5s: string, ant_ghsav: string, ant_elapsed: string, ant_foundblocks: string, ant_localwork: string, ant_utility: string, ant_wu: string, ant_bestshare: string}>}
 */
exports.getMinerStatus = async function(ip, username, password) {
    console.log('get miner status');

    const body = await doRequest('http://' + ip + '/' + 'cgi-bin/minerStatus.cgi', username, password);
    const dom = new JSDOM(body);

    if (dom.window.document.querySelector("#ant_ghsav") !== null) {
        const ant_ghs5s = dom.window.document.querySelector("#ant_ghs5s").textContent;
        const ant_ghsav = dom.window.document.querySelector("#ant_ghsav").textContent;
        const ant_elapsed = dom.window.document.querySelector("#ant_elapsed").textContent;
        const ant_foundblocks = dom.window.document.querySelector("#ant_foundblocks").textContent;
        const ant_localwork = dom.window.document.querySelector("#ant_localwork").textContent;
        const ant_utility = dom.window.document.querySelector("#ant_utility").textContent;
        const ant_wu = dom.window.document.querySelector("#ant_wu").textContent;
        const ant_bestshare = dom.window.document.querySelector("#ant_bestshare").textContent;


        return {
            ant_ghs5s: ant_ghs5s,
            ant_ghsav: ant_ghsav,
            ant_elapsed: ant_elapsed,
            ant_foundblocks: ant_foundblocks,
            ant_localwork: ant_localwork,
            ant_utility: ant_utility,
            ant_wu: ant_wu,
            ant_bestshare: ant_bestshare
        };
    }
};

/**
 * Get system info from miner.
 *
 * @param ip
 * @param username
 * @param password
 * @return {Promise<any>}
 */
exports.getOverview = async function (ip, username, password) {
    console.log('get overview');

    const data = await doRequest('http://' + ip + '/' + 'cgi-bin/get_system_info.cgi', username, password);

    return JSON.parse(data);
};

/**
 * Get miner pool from miner configuration.
 *
 * @param ip
 * @param username
 * @param password
 * @return {Promise<string>}
 */
exports.getMinerPool = async function (ip, username, password) {
    console.log('get miner configuration');

    const body = await doRequest('http://' + ip + '/' + 'cgi-bin/minerConfiguration.cgi', username, password);
    const reg = /"url" : "([\w\W]+?):[0-9]+?"/;
    const match = reg.exec(body);

    if (match) {

        return match[1];

    } else {

        return null;

    }
};

exports.isMiner = async function (ip) {
    try {
        const response = await axios.get('http://' + ip);
        return response.status;
    } catch (err) {
        return err.response.status;
    }
};


