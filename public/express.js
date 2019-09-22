const netList = require('network-list');
const axios = require('axios');

const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const isPortReachable = require('is-port-reachable');
const isReachable = require('is-reachable');

const miner = require('./modules/miner');
const minerAxios = require('./modules/miner_axios');
const hlor = require('./modules/hlor');
const hlorAxios = require('./modules/hlor_axios');
const integralWebServer = require('./modules/integal_web_server');
const worker = require('./modules/worker');
const config = require('./config-electron');
const setting = require('./modules/setting');
const log = require('./modules/log');

// const os = require('os');
// const ifaces = os.networkInterfaces();

exports = module.exports = createApp;


function createApp() {

    const express = require("express");
    const moment = require('moment');

    log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] init application');

    // create app
    const app = express();
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../build")));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    console.log('dir1', path.resolve('.'));
    console.log('dirname: ', config.db);
    // endpoints
    app.get('/', function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.get("/login", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.get("/network", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.get("/logs", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.get("/settings", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.get("/about", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.get("/locked", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.get("/password", function (request, response) {
        response.status(200).sendFile(path.join(__dirname, "../build/index.html"));
    });



    /**
     * scan network
     */
    app.get("/scan", async function(request, response){
            response.setHeader('Content-Type', 'application/json');
            log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] start scan...');

            netList.scan({}, async (err, arr) => {
                console.log(arr); // array with all devices
                const resArr = [];

                for(var i = 0; i < arr.length; i++) {
                    if (arr[i]['alive']) {
                        const isWebServer = await isPortReachable(80, {host: arr[i]['ip']});

                        if (isWebServer) {
                            arr[i]['is_web_server'] = true;
                            const status = await minerAxios.isMiner(arr[i]['ip']);
                            if (status === 401) {
                                console.log('status', status);
                                arr[i]['is_asic'] = true;
                                resArr.push(arr[i]);
                            } else {
                                arr[i]['is_asic'] = false;
                            }

                        } else {
                            arr[i]['is_web_server'] = false;
                            arr[i]['is_asic'] = false;
                        }


                    }
                }
                log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] end scan');
                response.end(JSON.stringify(resArr));
            });
        });

    /**
     * Save setting
     */
    app.post("/setting/save", async function (request, response) {

        response.setHeader('Content-Type', 'application/json');
        // console.log('save setting');

        await setting.save(request.body);

        response.end(JSON.stringify({message: 'success'}));
    });

    /**
     * Get settings.
     */
    app.get("/setting", async function (request, response) {

        response.setHeader('Content-Type', 'application/json');
        // console.log('get settings');

        const settings = await setting.getSetting();

        response.end(JSON.stringify(settings));
    });

    /**
     * Init worker.
     */
    app.post("/worker/init", async function(request, response) {
        response.setHeader('Content-Type', 'application/json');

        const id = request.body.id;
        const workerItem = await worker.getWorker(id).catch(err => err);
        // console.log('item get worget:', workerItem);

        if (workerItem) {
            // console.log('workerName:', workerItem);
            const pool = await minerAxios.getMinerPool(workerItem.ip, workerItem.username, workerItem.password);

            if (pool) {
                const coin = await hlorAxios.getCoin(pool);
                const info = await minerAxios.getOverview(workerItem.ip, workerItem.username, workerItem.password);

                await integralWebServer.updateWorkerSingleParam(id, 'coin', coin);
                await integralWebServer.updateWorkerSingleParam(id, 'miner_type', info.minertype);
                // log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] init worker for ' + coin + ' ' + info.minertype);
                // console.log(info)
            }
        }

        response.end(JSON.stringify({message: 'success'}));
    });

    /**
     * add new worker
     */
    app.post("/worker/save", async function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        console.log(request.body);
        const miner_type = request.body.miner_type;
        const ip = request.body.ip;
        const username = request.body.username;
        const password = request.body.password;
        const worker_name = request.body.worker_name;
        const coin = request.body.coin;
        const avg_hashes = request.body.avg_hashes;
        const auth_key = request.body.auth_key;
        const time_start = Date.now();
        const status = 1;

        // check asic
        const isWebServer = await isPortReachable(80, {host: ip});

        let isAsic = false;

        if (isWebServer) {
            const status = await minerAxios.isMiner(ip);

            if (status === 401) {
                isAsic = true;
            }
        }

        if (!isAsic) {

            response.end(JSON.stringify({
                error: {
                    message: 'Device not active or this device is not asic'
                }
            }));

        } else {

            const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, function (err) {

                db.get("SELECT * FROM workers where ip=?", ip.trim(), function (err, row) {
                    if (!row) {
                        if (err === null) {
                            const stmt = db.prepare("INSERT INTO workers(miner_type, ip, username, password, worker_name, coin, avg_hashes, time_start, status, auth_key) " +
                                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                            stmt.run([miner_type, ip, username, password, worker_name, coin, 0, time_start, status, auth_key]);
                            stmt.finalize();
                            const n = Date.now();

                            db.get("SELECT last_insert_rowid() as id", function (err, row) {
                                console.log('lastId:', row);
                                response.end(JSON.stringify({
                                    id: row['id'],
                                    miner_type: miner_type,
                                    ip: ip,
                                    username: username,
                                    password: password,
                                    worker_name: worker_name,
                                    coin: coin,
                                    avg_hashes: 0,
                                    age: n - time_start,
                                    status: status,
                                    is_active: 0
                                }));
                            });


                        } else {
                            response.end(JSON.stringify({
                                error: {
                                    message: 'error in worker save: ' + err
                                }
                            }));
                        }
                    } else {

                        response.end(JSON.stringify({
                            error: {
                                message: 'this ip is already on worker list'
                            }
                        }));
                    }
                });
            });

        }
    });

    /**
     * Check ip.
     */
    app.post('/worker/check-ip', function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        const ip = request.body.ip;
        // console.log(request.body);
        const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, function(err) {
            db.get("SELECT * FROM workers where ip=?", ip, function (err, row) {
                if (row) {
                    response.end(JSON.stringify({ isset_ip: true}));
                } else {
                    response.end(JSON.stringify({ isset_ip: false}));
                }
            });
        });
    });

    /**
     * Check active ip and set status for worker
     */
    app.post('/worker/check-active-ip', async function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        const ip = request.body.ip;
        const isAsicReachable = await isReachable(ip);
        const isWebServer = await isPortReachable(80, {host: ip});
        let isActive = false;

        // console.log('reachable:', isAsicReachable);
        // console.log('web server:', isWebServer);

        if (isWebServer) {
            const status = await minerAxios.isMiner(ip);
            // console.log(status);
            if (status === 401) {
                console.log('status', status);
                isActive = true;
            }

        }

        const workerItem = await worker.getWorkerByIP(ip);

        if (!isActive) {

            if (workerItem) {
                // change status to not active
                await integralWebServer.updateWorkerSingleParam(workerItem.id, 'status', 0);
                log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] ' + ip + ' deactivated');
            } else {
                console.log('Worker not found.');
            }
        } else {

            if (workerItem) {
                // change status to active
                await integralWebServer.updateWorkerSingleParam(workerItem.id, 'status', 2);
                // log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] ' + ip + ' activated');
            } else {
                console.log('Worker not found.');
            }
        }


        response.end(JSON.stringify({
            isActive: isActive
        }));
    });

    /**
     * update worker name
     */
    app.post("/worker/update/:id", async function (request, response) {
        response.setHeader('Content-Type', 'application/json');

        // console.log('update', request.body);
        const worker_name = request.body.worker_name;


        // console.log(request.params.id);

        await integralWebServer.updateWorkerSingleParam(request.params.id, 'worker_name', worker_name);
        response.end(JSON.stringify({
            message: 'successful'
        }));
    });

    /**
     * update hash
     */
    app.post("/worker/update-hash", async function (request, response) {

        response.setHeader('Content-Type', 'application/json');
        // console.log('update hash');
        // console.log(config.timeoutSendHash, config.timeoutCalcHash);

        const id = request.body.id;
        const workerItem = await worker.getWorker(id).catch(err => err);


        if (workerItem) {
            const minerStatus = await minerAxios.getMinerStatus(workerItem.ip, workerItem.username, workerItem.password);

            // minerStatus.ant_ghsav = "45,678";
            // ant_ghs5s
            if (minerStatus) {

                const countIterations = config.timeoutSendHash / config.timeoutCalcHash;
                console.log('iteration', countIterations);
                console.log('workerItem.work_iteration', workerItem.work_iteration);
                console.log('minerStatus:', minerStatus);


                if (countIterations > workerItem.work_iteration) {
                    const newHash = workerItem.work_avg_hashes + Math.ceil(parseFloat(minerStatus.ant_ghsav.replace(",", ""))) * config.timeoutCalcHash;
                    const newIteration = workerItem.work_iteration + 1;

                    log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] ' + workerItem.ip + ' calc hashes ' + newHash + ' on iteration #' + workerItem.work_iteration);

                    await integralWebServer.updateWorkerSingleParam(id, 'work_avg_hashes', newHash);
                    await integralWebServer.updateWorkerSingleParam(id, 'work_iteration', newIteration);
                } else {
                    //send hash
                    console.log('send hash');
                    console.log('work_avg_hashes', workerItem.work_avg_hashes);

                    if (workerItem.work_avg_hashes !== 0) {
                        const settings = await setting.getSetting();
                        const overview = await minerAxios.getOverview(workerItem.ip, workerItem.username, workerItem.password);
                        const unit = overview.minertype;
                        const auth = await hlorAxios.getAuth(settings.username, settings.hlor_key, unit, config.version);

                        console.log('auth:', auth);

                        if (auth === 'Fail') {
                            console.log('fail auth');
                        }

                        if (auth === 'Accept') {
                            if (workerItem.work_avg_hashes !== 0) {
                                hlorAxios.sendToHlorIO(settings.username,
                                    settings.hlor_key,
                                    workerItem.worker_name,
                                    workerItem.coin,
                                    workerItem.work_avg_hashes * 1000000000);

                                // update avg hashes in table
                                await integralWebServer.updateWorkerSingleParam(id, 'avg_hashes', workerItem.work_avg_hashes * 1000000000);
                            }

                            await integralWebServer.updateWorkerSingleParam(id, 'work_avg_hashes', 0);
                            await integralWebServer.updateWorkerSingleParam(id, 'work_iteration', 0);

                            log.write('[' + moment().format('YYYY/MM/DD h:mm:ss a') + '] ' + workerItem.ip + ' send hlor ' + (workerItem.work_avg_hashes * 1000000000));

                        }
                    } else {
                        await integralWebServer.updateWorkerSingleParam(id, 'work_avg_hashes', 0);
                        await integralWebServer.updateWorkerSingleParam(id, 'work_iteration', 0);
                    }


                }


            }
        }

        response.end(JSON.stringify({message: 'success'}));
    });

    /**
     * toggle active worker
     */
    app.get("/worker/toggle-active/:id", async function (request, response) {
        response.setHeader('Content-Type', 'application/json');

        const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, function(err) {
            db.get("SELECT * FROM workers WHERE id=?",request.params.id, async function (err, row) {
                const is_active = row['is_active'] === 0 ? 1 : 0;
                await integralWebServer.updateWorkerSingleParam(request.params.id, 'is_active', is_active);
            });
        });

        response.end(JSON.stringify({
            message: 'successful'
        }));
    });


    /**
     * Delete worker.
     */
    app.delete("/worker/delete/:id", async function (request, response) {
        response.setHeader('Content-Type', 'application/json');

        const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, function(err) {
            const stmt = db.prepare("DELETE FROM workers WHERE id=?");
            stmt.run([request.params.id]);
            stmt.finalize();
        });

        response.end(JSON.stringify({
            message: 'successful'
        }));
    });


    /**
     * Worker list.
     */
    app.get("/worker/list", function (request, response) {
            response.setHeader('Content-Type', 'application/json');

            const rows = [];
            const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, function(err) {
                db.each("SELECT * FROM workers", function(err, row) {
                    console.log(row);
                    const n = Date.now();
                    row['age'] = (n - row.time_start)/1000;
                    rows.push(row);
                }, function (err) {
                    console.log(err);
                    response.end(JSON.stringify(rows));
                });


            });

        });

    /**
     * Get worker.
     */
    app.get("/worker/:id", function (request, response) {
            response.setHeader('Content-Type', 'application/json');

            const db = new sqlite3.Database(config.db, sqlite3.OPEN_READWRITE, function(err) {
                if (err === null) {
                    db.get("SELECT * FROM workers WHERE id=?", request.params.id, function (err, row) {
                        console.log(row);
                        if (err === null) {
                            response.end(JSON.stringify(row));
                        } else {
                            response.end(JSON.stringify({
                                error: err
                            }));
                        }
                    });
                }
            });

        });


    app.post('/hlor/send-hash', async function (request, response) {
        response.setHeader('Content-Type', 'application/json');

        const id = request.body.id;
        const workerItem = await worker.getWorker(id).catch(err => err);
        // console.log('item get worget:', workerItem);

        if (workerItem) {
            // console.log('workerName:', workerItem);
            const pool = await minerAxios.getMinerPool(workerItem.ip, workerItem.username, workerItem.password);
            //const minerStatus = await minerAxios.getMinerStatus(workerItem.ip, workerItem.username, workerItem.password);
            // console.log('overview:', overview);

            if (pool) {
                const coin = await hlorAxios.getCoin(pool);
                const info = await minerAxios.getOverview(workerItem.ip, workerItem.username, workerItem.password);

                await integralWebServer.updateWorkerSingleParam(id, 'coin', coin);
                await integralWebServer.updateWorkerSingleParam(id, 'miner_type', info.minertype);
                // console.log(info)
            }
        }

        response.end(JSON.stringify({message: 'success'}));
    });


    /**
     * Write log.
     */
    app.post('/log/write', async function (request, response) {
        response.setHeader('Content-Type', 'application/json');

        const id = request.body.id;
        const workerItem = await worker.getWorker(id).catch(err => err);
        console.log('item get worget:', workerItem);

        if (workerItem) {
            console.log('workerName:', workerItem);
            const pool = await minerAxios.getMinerPool(workerItem.ip, workerItem.username, workerItem.password);
            const minerStatus = await minerAxios.getMinerStatus(workerItem.ip, workerItem.username, workerItem.password);
            // console.log('overview:', overview);

            if (pool) {
                const coin = await hlorAxios.getCoin(pool);
                const info = await minerAxios.getOverview(workerItem.ip, workerItem.username, workerItem.password);

                await integralWebServer.updateWorkerSingleParam(id, 'coin', coin);
                await integralWebServer.updateWorkerSingleParam(id, 'miner_type', info.minertype);
                // console.log(info)
            }
        }

        response.end(JSON.stringify({message: 'success'}));
    });



    /**
     * Hlor Login.
     */
    app.post('/hlor/login', async function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        const username = req.body.username;
        const password = req.body.password;

        console.log(req.body);
        const token = await axios({
            method: 'post',
            url: 'https://hlor.io/rest/login/',
            data: {
                "username": username,
                "password": password
            }
        }).then(res => {
            return res.data.token;
        }).catch(err => {
            return err.response.data;
        });



        res.end(JSON.stringify({token: token}));
    });

    /**
     * Hlor Login.
     */
    app.get('/hlor/user-info', async function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        const token = req.query.token;

        const info = await axios({
            method: 'get',
            url: 'https://hlor.io/rest/user-info/?token=' + token,
        }).then(res => {
            return res.data;
        }).catch(err => {
            return err.response.data;
        });



        res.end(JSON.stringify(info));
    });



    /**
     * Read Log.
     */
    app.get('/log/read', async function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        const logContent = await log.read();

        res.end(JSON.stringify({
            logData: logContent.replace(/(?:\r\n|\r|\n)/g, '<br>')
        }));
    });



    // listen port 2808
    app.listen(2808);
}

