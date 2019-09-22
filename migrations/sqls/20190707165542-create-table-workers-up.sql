/* Replace with your SQL commands */

CREATE TABLE workers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    miner_type CHAR(255),
    ip CHAR(255),
    username CHAR(255) DEFAULT '' NOT NULL,
    password CHAR(255) DEFAULT '' NOT NULL,
    worker_name CHAR(255),
    coin CHAR(255),
    avg_hashes REAL,
    time_start INTEGER,
    status INTEGER,
    is_active INTEGER DEFAULT 0 NOT NULL,
    work_avg_hashes REAL DEFAULT 0 NOT NULL,
    work_iteration INTEGER DEFAULT 0 NOT NULL,
    auth_key CHAR(255) DEFAULT '' NOT NULL
);
