module.exports = function (app, db, mongoose) {

    var customerModel = require("./models/customer.model.server.js")(db, mongoose);
    var customerService = require("./services/customer.service.server.js")(app, customerModel);
};