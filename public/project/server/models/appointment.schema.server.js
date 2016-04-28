module.exports = function (mongoose) {
    var AppointmentSchema = mongoose.Schema({
            professionalId: {type: String, required: true},
            customerId: {type: String},
            time: {type: String, required: true},
            status: String,
            service: String
        },
        {collection: "appointment"});

    AppointmentSchema.index({professionalId: 1, time: 1}, {unique: true});

    return AppointmentSchema;
};