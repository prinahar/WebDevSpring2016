var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var uuid = require('node-uuid');
var upload = multer(); // for parsing multipart/form-data
//var session       = require('express-session');

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/AssignmentWebDev';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_APP_NAME;
    }

// connect to the database
var db = mongoose.connect(connectionString);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/hello', function(req, res){
    res.send('hello world');
});
// Initializing server app.js
require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);

