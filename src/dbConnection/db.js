const pgPool = require("pg").Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new pgPool({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;

