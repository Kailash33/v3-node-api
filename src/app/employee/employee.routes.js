const express = require("express");
const router = express.Router();
const { sanitizeBody, validationResult } = require("express-validator");
const jwt = require("../../middleware/jwt.middleware");
const apiResponse = require("../../utils/apiResponse");
const validate = require("../../middleware/validation");

router.post('/', async (req, res, next) => {
    res.json({
        data: req.body.firstName
    }).status(200);
})

module.exports = router;