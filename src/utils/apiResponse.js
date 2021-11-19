/**
 * *Author : Kailash -- Dt: 28st Oct 2021 Documentation maintained for http reponse codes ..
=============================================================================================================
* HTTP Status Code  ||              Description
=============================================================================================================
* ? 200   OK	                    Successful.

* ? 201   Created	                Created.. 

* ? 400   Bad Request	            Bad input parameter. Error message should indicate which one and why.

* ? 401   Unauthorized	            The client passed in the invalid Auth token. 
* ?                                 || Client should refresh the token and then try again.

* ? 403   Forbidden	                Customer doesn’t exist. || Application not registered. 
* ?                                 || Application try to access to properties not belong to an App. 
* ?                                 || Application try to trash/purge root node. 
* ?                                 || Application try to update contentProperties. 
* ?                                 || Operation is blocked (for third-party apps).  
* ?                                 || Application try to update contentProperties. 

* ? 404   Not Found	                Resource not found.

* ? 405   Method Not Allowed        The resource doesn't support the specified HTTP verb.

* ? 409   Conflict	                Conflict.

* ? 411   Length Required	        The Content-Length header was not specified.

* ? 412   Precondition Failed	    Precondition failed.

* ? 429   Too Many Requests	        Too many request for rate limiting.

* ? 500   Internal Server Error	    Servers are not working as expected. 
* ?                                 || The request is probably valid but needs to be requested again later.

* ? 503   Service Unavailable	    Service Unavailable.
*/

exports.successResponse = function (res, msg) {
	var data = {
		status: true,
		responseCode: 200,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		status: true,
		responseCode: 200,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.validationErrorWithData = function (res, msg, data) {
	var responseData = {
		status: false,
		responseCode: 200,
		message: msg,
		data: data
	};
	return res.status(200).json(responseData);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		status: false,
		responseCode: 500,
		message: msg,
	};
	return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		status: false,
		responseCode: 404,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.unauthorizedResponse = function (res, msg) {
	var data = {
		status: false,
		responseCode: 401,
		message: msg,
	};
	return res.status(401).json(data);
};

exports.tokenAuthResponse = function (res, msg) {
	var data = {
		status: false,
		responseCode: 403,
		message: msg,
	};
	return res.status(403).json(data);
}; 