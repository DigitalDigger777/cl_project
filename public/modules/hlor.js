const http = require('http');
const request = require('request');
const fs = require('fs');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const miner = require("./miner");


function doRequest(url, form) {
    return new Promise(function (resolve, reject) {
        request.post(url, {
            form: form
        }, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

exports.getAuth = function(username, key, unit, version) {
    console.log('get auth');

    return doRequest('https://hlor.io/userpost/', {
        username: username,
        key: key,
        unit: unit,
        version: version
    });
};

exports.getCoin = function(pool) {
    console.log('get coin');

    return doRequest('https://hlor.io/get_coin/', {
        pool: pool
    });
};

exports.sendToHlorIO = function(user, key, wname, coin, hash) {
    console.log('get send to hlor.io');

    return doRequest('https://hlor.io/hlorpost/', {
        user: user,
        key: key,
        wname: wname,
        coin: coin,
        hash: hash
    });
};

/**
 *
 * @param asic_obj object {ip: '192.168.0.18', user:'root', password: 'root'}
 * @param worker_obj object {user: 'hlor_user', key: 'hlor_key', worker_name: 'example_worker'}
 */
exports.bot = function (asic_obj, worker_obj) {

    let iterator = 0;
    let hash = 0;

    const timer = setInterval(function () {
        miner.getMinerStatus(asic_obj.ip, asic_obj.user, asic_obj.password, function (data) {
            console.log(data.ant_ghs5s);
            // const ant_ghs5s = data.ant_ghs5s;
            hash += parseFloat("4780");

            if (iterator === 12) {
                iterator = 0;
                hash = hash * 5 * 1000000000;
                console.log('hash:', hash);

                miner.getOverview(asic_obj.ip, asic_obj.user, asic_obj.password, async function (data) {
                    console.log(data);

                    const unit = data.minertype;
                    const auth = await exports.getAuth(worker_obj.user, worker_obj.key, unit, worker_obj.version);

                    console.log(auth);

                    miner.getMinerConfiguration(asic_obj.ip, asic_obj.user, asic_obj.password, async function (pool) {

                        console.log('pool:', pool);
                        let coin = '';
                        try {
                            coin = await exports.getCoin(pool);
                        } catch (e) {
                            console.log(`test ${e}`)
                            coin = await exports.getCoin(pool);
                        }

                        console.log('coin:', coin);
                        console.log('sent data:', {
                            user: worker_obj.user,
                            key: worker_obj.key,
                            wname: worker_obj.worker_name,
                            coin,
                            hash
                        });

                        const sentHlor = await exports.sendToHlorIO(worker_obj.user, worker_obj.key, worker_obj.worker_name, coin, hash);
                        console.log('sent hlor:', sentHlor);
                    });

                });
                console.log('Finished bot iteration');
                clearInterval(timer);
            } else {
                iterator++;
            }
        });
    }, 5000);
};
