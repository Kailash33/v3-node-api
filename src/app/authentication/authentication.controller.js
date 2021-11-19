const { await } = require('asyncawait');
const apiResponse = require('../../utils/apiResponse');
const authService = require('./authentication.service');

exports.signin = async (req, res, next) => {
    try {
        authService.checkUserEmail(req.body.email).then((fetchedUser) => {
            if (fetchedUser) {
                if (authService.matchPassword(req.body.password, fetchedUser.password)) {
                    authService.generateJWTToken(fetchedUser).then((user) => {
                        return apiResponse.successResponseWithData(res, "Login Successfully.", user);
                    })
                }
                else {
                    return apiResponse.ErrorResponse(res, "Password does not match, Please try again.");
                }
            }
            else {
                return apiResponse.validationErrorWithData(res, "Please enter the correct emailid", []);
            }
        })

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const reqUser = req.body;
        console.log(reqUser);
        const isUserExists = await authService.checkEmailExists(reqUser.email);
        if (isUserExists) {
            apiResponse.successResponseWithData(res, "User Already Exists", {});
        }
        else {
            reqUser.hashPassword = await authService.generateEncryptPassword(reqUser.password);
            let createdUser = await authService.addUser(reqUser);
            if (createdUser) {
                apiResponse.successResponseWithData(res, "User Created Successfully", createdUser);
            }
            else {
                apiResponse.successResponseWithData(res, "Something Went Wrong, Please Try Again.", {});
            }
        }

    } catch (error) {
        throw error;
    }
}


exports.getCountries = async (req, res, next) => {
    try {
        authService.getCountryList().then(data => {
            if (data) {
                apiResponse.successResponseWithData(res, "Data Found", data);
            }
            else {
                apiResponse.successResponseWithData(res, "No Data Found", []);
            }
        })
    } catch (error) {
        console.log(err);
        throw error;
    }
}

exports.getStates = async (req, res, next) => {
    try {
        authService.getStateList(req).then(data => {
            if (data) {
                apiResponse.successResponseWithData(res, "Data Found", data);
            }
            else {
                apiResponse.successResponseWithData(res, "Data Not Found", []);
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}
