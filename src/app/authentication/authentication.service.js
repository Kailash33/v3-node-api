const _jwt = require("../../middleware/jwt.middleware");
const pool = require("../../dbConnection/db");
const bcrypt = require("bcrypt");
const { await } = require("asyncawait");

// CHECK THE USER EMAIL IS EXISTS OR NOT
exports.checkUserEmail = async (email) => {
    try {
        const response = await pool.query(
            `SELECT * FROM tblusers WHERE emailid = '${email}';`
        );
        // console.log(response);
        return response.rowCount > 0 ? response.rows[0] : null;
    } catch (error) {
        return false;
    }
};

exports.generateEncryptPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashPassword) => {
            if (err) {
                resolve(false);
            } else {
                resolve(hashPassword);
            }
        });
    });
};

exports.matchPassword = async function (reqPassword, fetchedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(reqPassword, fetchedPassword, function (err, isMatched) {
            err ? resolve(false) : resolve(isMatched);
        });
    });
};

exports.generateJWTToken = async (payload) => {
    return new Promise((resolve, reject) => {
        if (payload) {
            jwtPayload = {
                userid: payload.userid,
                fullname: payload.fullname,
                role: payload.role,
                emailid: payload.emailid,
                contactno: payload.contactno,
            };

            jwtPayload.token = _jwt.generateJWTToken(jwtPayload);
            resolve(jwtPayload);
        }
    });
};

exports.getCountryList = async () => {
    try {
        // let response = await pool.query(
        //     `SELECT * FROM tblcountry WHERE status = true;`
        // );
        // console.log("country list response: ", response);
        // if (response.rowCount > 0) {
        //     return response.rows;
        // } else {
        //     return null;
        // }
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM tblcountry`, (err, data) => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(data.rows);
                }
            })
        })
    } catch (error) {
        return false;
    }
};

exports.getStateList = async (req) => {
    try {
        countryid = req.query.countryid;
        let response = await pool.query(
            `SELECT * FROM tblstate WHERE countryid = ${countryid} AND status = true;`
        );
        if (response.rowCount > 0) {
            return response.rows;
        } else {
            return null;
        }
    } catch (error) {
        return false;
    }
};


exports.checkEmailExists = async (email) => {
    try {
        return new Promise(async (resolve, reject) => {
            await pool.query(`SELECT * FROM tblusers WHERE emailid = '${email}';`, (err, res) => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(res.rowCount > 0);
                }
            })
        })
    } catch (error) {
        return false;
    }
}

exports.addUser = async (user) => {
    try {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO tblusers(fullname, emailid, contactno, role, password) VALUES ($1, $2, $3, $4, $5) 
            RETURNING userid, fullname, emailid, contactno, role;`;
            pool.query(query, [user.fullname, user.email, user.mobile, user.role, user.hashPassword], (err, response) => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(response.rows[0]);
                }
            })
        })
    } catch (error) {
        throw error;
    }
}