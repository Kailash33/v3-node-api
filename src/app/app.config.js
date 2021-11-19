'use strict';

const dotenv = require('dotenv');
dotenv.config();

// Express environment variable.
const { NODE_ENVIRONMENT, PORT, secretKey, key, server, url, client } = process.env;

const { JWT_TOKEN_SECRET, JWT_TIMEOUT_DURATION } = process.env;

module.exports = {
    ENV: NODE_ENVIRONMENT,
    PORT: PORT,
    secretKey: secretKey,
    key: key,
    server: server,
    url: url,
    client:client,

    JWT_TOKEN_SECRET: JWT_TOKEN_SECRET,
    JWT_TIMEOUT_DURATION: JWT_TIMEOUT_DURATION
}
