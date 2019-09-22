const http = require('http');
const request = require('request');
// const DigestClient = require('digest-client');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//exports = module.exports = Miner;

exports.getMinerStatus = function(ip, username, password, callback) {
    console.log('get miner status');

    request.get('http://' + ip + '/' + 'cgi-bin/minerStatus.cgi', {
        'auth': {
            'user': username,
            'pass': password,
            'sendImmediately': false
        }
    }, function(err, response, body) {
        if (err) {
            console.log('Error in getMinerStatus:', err);
            // TODO: change status of asic to not active
            callback(null);
        }

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


            callback({
                ant_ghs5s: ant_ghs5s,
                ant_ghsav: ant_ghsav,
                ant_elapsed: ant_elapsed,
                ant_foundblocks: ant_foundblocks,
                ant_localwork: ant_localwork,
                ant_utility: ant_utility,
                ant_wu: ant_wu,
                ant_bestshare: ant_bestshare
            });
        } else {
            callback(null);
        }
    });
};

exports.getOverview = function (ip, username, password, callback) {
    console.log('get overview');

    request.get('http://' + ip + '/' + 'cgi-bin/get_system_info.cgi', {
        'auth': {
            'user': username,
            'pass': password,
            'sendImmediately': false
        }
    }, function(err, response, body) {
        if (err) {
            console.log('Error in getOverview:', err);

            callback(null);
        }

        const data = JSON.parse(body);

        if (data) {
            callback(data);
        } else {
            console.log('JSON.parse in getOverview:', err);

            callback(null);
        }
    });
};


exports.getMinerConfiguration = function (ip, username, password, callback) {
    console.log('get miner configuration');

    request.get('http://' + ip + '/' + 'cgi-bin/minerConfiguration.cgi', {
        'auth': {
            'user': username,
            'pass': password,
            'sendImmediately': false
        }
    }, function(err, response, body) {
        if (err) {
            console.log('Error in getMinerConfiguration:', err);

            callback(null);
        }


        const reg = /"url" : "([\w\W]+?):[0-9]+?"/;
        const match = reg.exec(body);

        if (match) {

            const pool = match[1];
            callback(pool);

        } else {

            console.log('Error in getMinerConfiguration: Can\'t match url');
            callback(null);

        }

    });
};


