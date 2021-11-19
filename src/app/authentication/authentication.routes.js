const express = require("express");
const router = express.Router();
const { sanitizeBody, validationResult } = require("express-validator");
const jwt = require("../../middleware/jwt.middleware");
const apiResponse = require("../../utils/apiResponse");
const validate = require("../../middleware/validation");
const authController = require("./authentication.controller");

/**
 * * Author : KAIALSH -- Dt: 28 Oct 2021
 * @description : to get routeURL.
 * @returns  {@route URL}
 */

async function getRouteUrl(req) {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    return fullUrl;
}

/**
 * * Author : KAILASH -- Dt: 28 Oct 2021
 * @Api : auth/_test
 * @method : get
 * @description : for test api
 * @returns  {@responseCode,@responseMessage}
 */
router.get("/_test", async (req, res) => {
    try {
        var fullUrl = await getRouteUrl(req);
        res.send({
            responseCode: 200,
            responseMessage:
                "Hii @Kailash test api is working fine, Your Request URL [ " +
                fullUrl +
                " ]",
        });
    } catch (err) {
        res.send({
            responseCode: 422,
            responseMessage: "Some request missing",
        });
    }
});

/**
 * @Api : auth/signin
 * @method : POST
 * @description : for user signin/login
 *
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 **/
router.post(
    "/signin",
    validate._signin,
    sanitizeBody("*").escape(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    "Validation Error.",
                    errors.array()
                );
            } else {
                next();
            }
        } catch (err) {
            // throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    },
    authController.signin
);

/**
 * @Api : auth/adduser
 * @method : POST
 * @description : CREATE NEW USER
 *
 * @param {string} fullname
 * @param {string} email
 * @param {string} mobile
 * @param {string} role
 * @param {string} password
 * @returns {Object}
 **/
router.post("/adduser", validate._createNewUser, sanitizeBody("*").escape(), async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            next();
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, err);
    }
}, authController.createUser);

/**
 * @Api : auth/getcountry
 * @method : GET
 * @description : for get country list
 *
 * @returns {Object}
 **/

router.get(
    "/getcountry",
    async (req, res, next) => {
        try {
            next();
        } catch (err) {
            console.log(err);
            return apiResponse.ErrorResponse(res, err);
        }
    },
    jwt.authenticateJWTToken,
    authController.getCountries
);

/**
 * @Api : auth/getstate
 * @method : GET
 * @description : for get state list
 *
 * @returns {Object}
 **/
router.get(
    "/getstate",
    validate._getstate,
    sanitizeBody("*").escape(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    "Validation Error.",
                    errors.array()
                );
            } else {
                next();
            }
        } catch (err) {
            // throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    },
    jwt.authenticateJWTToken,
    authController.getStates
);

module.exports = router;
