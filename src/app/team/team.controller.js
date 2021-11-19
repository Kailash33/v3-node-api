const { await } = require('asyncawait');
const apiResponse = require('../../utils/apiResponse');
const teamService = require('./team.service');

module.exports.getTeams = async (req, res, next) => {
    try {
        let data = await teamService.getTeams();
        if (data) {
            apiResponse.successResponseWithData(res, "Data Found", data);
        }
        else {
            apiResponse.successResponseWithData(res, "No Data Found", []);
        }
    } catch (error) {
        console.log(error);
        apiResponse.ErrorResponse(res, error);
    }
}

module.exports.createTeam = async (req, res, next) => {
    try {
        teamService.createTeam(req).then(data => {
            if (data) {
                apiResponse.successResponseWithData(res, "Team Created Successfully", data);
            }
            else {
                apiResponse.successResponseWithData(res, "Something went wrong !, Please Try Again.", {});
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}