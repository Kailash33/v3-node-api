const express = require("express");
const logger = require("morgan");
const express_FileUpload = require("express-fileupload");
const config = require("./src/app/app.config");
const pool = require("./src/dbConnection/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const responseTime = require("response-time");
const schedule = require("node-schedule");
const time_recuurence = new schedule.RecurrenceRule();

const app = express();
const apiRoutes = require("./src/app/app.routes");
const apiResponse = require("./src/utils/apiResponse");

//Create a middleware that adds a X-Response-Time header to responses.
var resintercept = require("./src/utils//ResponseInterceptor");

app.use(resintercept.modifyResponseBody);

app.use(express_FileUpload());

app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(responseTime());
app.use(logger("dev"));

// Allow to access image
app.use(express.static(__dirname + "/wwwroot"));

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/", (req, res, next) => {
  apiResponse.successResponse(res, "Demo Node JS API running successfully.");
});

app.use("/api/", apiRoutes);

app.all("*", (req, res) => {
  return apiResponse.notFoundResponse(
    res,
    "404\n Invalid API URLs, Please check it."
  );
});

// SET PORT
const port = config.port || 3000;
app.listen(port, () => {
  console.log(
    `Server is listening on port ${port}, click here http://localhost:${port}/`
  );
});

time_recuurence.minute = 10;

const job = schedule.scheduleJob(time_recuurence, () => {
  console.log("Scheduler called after 10 minutes...");
});
