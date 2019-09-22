const sqlite3 = require('sqlite3').verbose();
const config = require('./../config-electron');

/**
 * Update settings.
 *
 * @param setting
 * @return {Promise<void>}
 */
exports.save = async function(settings) {

    const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, async function(err) {

        if (err === null) {

            await db.get("SELECT * FROM setting", async function(err, row) {

                if (err === null) {

                    if (typeof row !== 'undefined') {
                        const stmt = await db.prepare("UPDATE setting SET username=?, hlor_key=?, date_add=? WHERE id=?");
                        stmt.run([settings.username, settings.key, + new Date(), row.id]);
                        stmt.finalize();
                    } else {
                        const stmt = await db.prepare("INSERT INTO setting(username, hlor_key, date_add) VALUES(?, ?, ?)");
                        stmt.run([settings.username, settings.key, + new Date()]);
                        stmt.finalize();
                    }

                }

            });


        } else {
            console.log('error in setting save: ', err);
        }
    });

};


exports.getSetting = async function () {
    const promise = new Promise((resolve, reject) => {
        const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, async function(err) {

            if (err === null) {

                await db.get("SELECT * FROM setting", async function(err, row) {

                    if (err === null) {
                        resolve(row);
                    } else {
                        reject(err.toString())
                    }

                });


            } else {

                reject(err.toString())

            }
        });
    })

    return await promise;
};
