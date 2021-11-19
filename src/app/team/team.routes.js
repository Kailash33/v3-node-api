const express = require("express");
const router = express.Router();
const { sanitizeBody, validationResult } = require("express-validator");
const jwt = require("../../middleware/jwt.middleware");
const apiResponse = require("../../utils/apiResponse");
const validate = require("../../middleware/validation");
const teamController = require("./team.controller");
const fileUpload = require("../../middleware/fileUpload.middleware");

/**
 * @Api : team
 * @method : GET
 * @description : for get teams list
 *
 * @returns {Object}
 **/
router.get("/", async (req, res, next) => {
  try {
    next();
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
}, jwt.authenticateJWTToken, teamController.getTeams);

/**
 * @Api : team
 * @method : POST
 * @description : FOR CREATE TEAM
 *
 * @param {string} teamName
 * @param {string} description
 *
 * @returns {Object}
 **/
router.post(
  "/",
  validate._createTeam,
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
  teamController.createTeam
);

module.exports = router;
