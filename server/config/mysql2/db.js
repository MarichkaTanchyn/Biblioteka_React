const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'msdb',
    user: 'root',
    password: 'root'
});

module.exports = pool;