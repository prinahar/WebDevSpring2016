module.exports = function (app, db, mongoose) {

    var customerModel = require("./models/customer.model.server.js")(db, mongoose);
    var customerService = require("./services/customer.service.server.js")(app, customerModel);
    var professionalModel = require("./models/professional.model.server.js")(db, mongoose);
    var professionalService = require("./services/professional.service.server.js")(app, professionalModel);
    var userService = require("./services/user.service.server.js")(app, customerModel, professionalModel);
};