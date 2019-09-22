const sqlite3 = require('sqlite3').verbose();
const config = require('./../config-electron');

/**
 * Get worker by ip.
 *
 * @param ip
 * @return {Promise<void>}
 */
exports.getWorkerByIP = async function(ip) {

    const promise = new Promise((resolve, reject) => {

        const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE,async function(err) {

            if (err === null) {

                db.get("SELECT * FROM workers WHERE ip=?", ip, function(err, row) {

                    if (err === null) {
                        if (typeof row !== 'undefined') {

                            resolve(row);
                        } else {
                            reject(null);
                        }

                    } else {
                        console.log('error in get worker by ip: ', err);
                        reject(null);
                    }
                });

            } else {
                console.log('error in get worker by ip: ', err);
                reject(null);
            }
        });

    });

    return await promise;
};


exports.getWorker = async function(id) {
    const promise = new Promise((resolve, reject) => {

        try {
            const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE,async function(err) {

                if (err === null) {

                    db.get("SELECT * FROM workers WHERE id=?", id, function(err, row) {

                        if (err === null) {
                            if (typeof row !== 'undefined') {
                                resolve(row);
                            } else {
                                reject('worker not found');
                            }

                        } else {
                            reject('error in get worker: ' + err);
                        }
                    });

                } else {
                    // console.log('error in get worker: ', err);
                    reject('error in get worker: ' + err);
                }
            });
        } catch (e) {
            reject(e.toString());
        }


    });

    return await promise;
};
