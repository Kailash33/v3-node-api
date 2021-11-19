const { await } = require('asyncawait');
const pool = require("../../dbConnection/db");

exports.getTeams = async () => {
    try {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM tblteams;`, (err, res) => {
                if (err) {
                    resolve(false);
                }
                else {
                    console.log('Team List:', res.rows);
                    resolve(res.rows);
                }
            })
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.createTeam = async (req) => {
    try {
        const { teamName, description } = req.body;
        let response = await pool.query("INSERT INTO tblteams (teamname, description) VALUES ($1, $2) RETURNING *", [teamName, description]
        );

        return response.rowCount > 0 ? response.rows[0] : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
