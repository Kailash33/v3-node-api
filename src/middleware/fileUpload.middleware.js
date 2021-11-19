//===== require file uploading dependency
let path = require("path");
let fs = require("fs");
var mv = require("mv");
const _ = require("lodash");

module.exports.uploadFile = (req, subDirPath, prefixFileName) => {
  try {
    // CHECK THE FOLDER EXISTS OR NOT, IF NOT THEN CREATE ONE.
    if (!fs.existsSync("wwwroot")) {
      fs.mkdirSync("wwwroot");
    }
    const uploadFile = req.files.file;

    // CREATE DIRECTORY FOR UPLOAD
    var _dirName = path.join(__dirname, "../../wwwroot", subDirPath);
    if (!fs.existsSync(_dirName)) {
      fs.mkdirSync(_dirName);
    }

    // CREATE FILE NAME
    var _fileName = prefixFileName + "_" + uploadFile.name;
    var _filePath = path.join(_dirName, _fileName);
    var _fileUrl = req.protocol + "://" + req.headers.host + "/" + subDirPath + "/" + _fileName;

    responseData = {
      fileName: uploadFile.name,
      fileUrl: _fileUrl,
      mimeType: uploadFile.mimetype,
    };

    return new Promise((resolve, reject) => {
      uploadFile.mv(_filePath, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(responseData);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};


module.exports.uploadMultipleFile = function (req, subDirPath) {
  try {
    var _rootDirExists = fs.existsSync("wwwroot");
    if (!_rootDirExists) {
      fs.mkdirSync("wwwroot");
    } else {
      var _dirName = path.join(__dirname, "../../wwwroot", subDirPath);
      var _isDirExist = fs.existsSync(_dirName);
      if (!_isDirExist) {
        fs.mkdirSync(_dirName);
      }
      var _dirName = path.join(__dirname, "../../wwwroot", subDirPath);

      let responseData = [];
      return new Promise((resolve, reject) => {
        _.forEach(_.keysIn(req.files.file), (key) => {
          let _file = req.files.file[key];
          console.log("file", file);
          var _name = JSON.stringify(new Date().getTime()) + "_" + _file.name;
          var _filepath = path.join(_dirName, _name);
          var _fileurl = req.protocol + "://" + req.headers.host + "/" + subDirPath + "/" + _name;
          //UPLOADING THE FILE
          req.files.file[key].mv(_filepath);

          //push file details
          responseData.push({
            _fileName: _file.name,
            _fileUrl: _fileurl,
          });
        });
        if (!responseData) {
          resolve(false);
        } else {
          resolve(responseData);
        }
      });
    }
  } catch (err) {
    //res.status(500).send(err);
  }
};
