const express = require('express');
const app = express();

//=============================================================================================================
//                                 ||   Authentication Pages routes ||                                       ||
//=============================================================================================================
var routes_authentication = require("./authentication/authentication.routes");
app.use("/auth/", routes_authentication);

//=============================================================================================================
//                                 ||   Team Pages routes ||                                       ||
//=============================================================================================================
var routes_teams = require("./team/team.routes");
app.use("/team/", routes_teams);

//=============================================================================================================
//                                 ||   Employee Pages routes ||                                       ||
//=============================================================================================================
var routes_employee = require("./employee/employee.routes");
app.use("/employee/", routes_employee);




module.exports = app;