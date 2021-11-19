const jwt = require('jsonwebtoken');
const config = require('../app/app.config');
const apiResponse = require('../utils/apiResponse');
const pool = require('../dbConnection/db');


// GENERATE JWT TOKEN WITH USER DATA AND JWT SECRET
exports.generateJWTToken = (user) => {
    const jwtPayload = user;
    const jwtData = { expiresIn: config.JWT_TIMEOUT_DURATION }
    const jwtSecret = config.JWT_TOKEN_SECRET

    const token = jwt.sign(jwtPayload, jwtSecret, jwtData);
    return String(token);
}

// AUTHENTICATE JWT TOKEN 
module.exports.authenticateJWTToken = (req, res, next) => {
    let _token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        _token = req.headers.authorization.split(" ")[1];
    }
    let _secret = config.JWT_TOKEN_SECRET;
    if (_token) {
        jwt.verify(_token, _secret, async (err, decoded) => {
            if (err) {
                return apiResponse.tokenAuthResponse(res, "Token authentication failed.");
            }
            else {
                req.decoded = decoded;
                let decodedData = {
                    "userid": decoded.userid,
                    "fullname": decoded.fullname,
                    "role": decoded.role,
                    "emailid": decoded.emailid,
                    "contactno": decoded.contactno,
                }
                console.log('jwt decoded data: ', decodedData);
                // CHECK USER VERIICATION IN DATABASE
                let response = await pool.query(`SELECT * FROM tblusers WHERE userid = $1;`, [decodedData.userid]);
                if (response.rowCount > 0) {
                    let user = response.rows[0];
                    if (user.status) {
                        next();
                    }
                    else {
                        return apiResponse.tokenAuthResponse(res, "User is not active, Please contact to admin.");
                    }
                }
                else {
                    return apiResponse.tokenAuthResponse(res, "User Not found");
                }
            }
        })
    }
    else {
        return apiResponse.tokenAuthResponse(res, "Please provide authentication token");
    }
}