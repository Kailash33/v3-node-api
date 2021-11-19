const { body, query, param, check, validationResult } = require('express-validator');

module.exports = {
    _signin: [
        body("email").isLength({
            min: 1
        }).trim().withMessage("Email must be specified.")
            .isEmail().withMessage("Email must be a valid email address."),
        body("password").isLength({
            min: 6
        }).trim().withMessage("Password must be 6 characters or greater.")
    ],

    // VALIDATION FOR NEW USER CREATE
    _createNewUser: [
        body("fullname").isLength({
            min: 3
        }).trim().withMessage('Full Name Is Required.'),
        body("email").isLength({
            min: 1
        }).trim().withMessage("Email must be specified.").isEmail().withMessage("Email must be a valid email address."),
        body('mobile').isLength({
            min: 10,
            max: 10
        }).trim().withMessage('Provide 10 Digits mobile no only.'),
        body('role').isLength({
            min: 4
        }).trim().withMessage('Please provide user role.'),
        body('password').isLength({
            min: 6
        }).trim().withMessage('Please provide password with minimum 6 characters.')
    ],

    // VALIDATION FOR GET STATE LIST
    _getstate: [
        query('countryid').isLength({
            min: 1
        }).trim().withMessage('Country Id must be specified')
    ],

    // VALIDATION FOR CREATE TEAM
    _createTeam: [
        body("teamName").isLength({
            min: 3
        }).trim().withMessage('Team name must be specified.'),
        body("description").isLength({
            min: 1
        }).trim().withMessage('Team Description must be specified')
    ]

}