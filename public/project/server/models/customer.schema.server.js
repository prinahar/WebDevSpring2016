
module.exports= function (mongoose) {
    var AppointmentSchema = require("./appointment.schema.server.js");
    var CustomerSchema = mongoose.Schema({
        username: {type: String, unique : true, required : true},
        password: {type: String, unique : true, required : true},
        email: {type: String, unique : true, required : true},
        firstName : String,
        lastName : String,
        role : String
    },
        {collection : "customer"});

    return CustomerSchema;
};