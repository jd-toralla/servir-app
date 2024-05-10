const mysql = require('mysql2');
require('dotenv').config();

// Configuración del pool de conexiones
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "servir",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const promisePool = pool.promise();

module.exports = promisePool;
