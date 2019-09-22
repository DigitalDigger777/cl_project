const sqlite3 = require('sqlite3').verbose();
const config = require('./../config-electron');

/**
 * Update worker single param from request.
 *
 * @param id
 * @param param
 * @param paramValue
 */
exports.updateWorkerSingleParam = async function(id, param, paramValue) {

    const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, async function(err) {

        if (err === null) {

            await db.get("SELECT * FROM workers WHERE id=?", id, async function(err, row) {

                if (err === null) {

                    if (typeof row !== 'undefined') {
                        const stmt = await db.prepare("UPDATE workers SET " + param + "=? WHERE id=?");
                        stmt.run([paramValue, id]);
                        stmt.finalize();
                    }

                }

            });


        } else {
            console.log('error in worker save: ', err);
        }
    });

};
