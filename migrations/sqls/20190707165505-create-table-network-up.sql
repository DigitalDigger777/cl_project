/* Replace with your SQL commands */

CREATE TABLE network(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status INTEGER default 0,
    ip CHAR(255),
    group_name CHAR(255),
    manufacturer CHAR(255),
    mac_address CHAR(255),
    username CHAR(255),
    date_add INTEGER
);
