var q = require("q");

module.exports = function (db, mongoose) {

    var AppointmentSchema = require("./appointment.schema.server.js")(mongoose);
    var AppointmentModel = mongoose.model('Appointment', AppointmentSchema);

    var api = {
        createAppointment: createAppointment,
        findAppointmentsByUser: findAppointmentsByUser,
        deleteAppointment: deleteAppointment,
        findAppointmentById: findAppointmentById,
        updateStatusToCompleted: updateStatusToCompleted,
        updateStatusToBooked: updateStatusToBooked
        //findAppointmentByStatus: findAppointmentByStatus


    };
    return api;

    //Professional creates appointments by selecting available times
    function createAppointment(appointment) {
        console.log("Inside!");
        var deferred = q.defer();
        AppointmentModel.create(appointment, function (err, doc) {
            if (err) {
                console.log("Error creating an appointment! " + err);
                deferred.reject(err);
            } else {
                console.log("Created an appointment!");
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAppointmentsByUser(userId, userRole) {
        var deferred = q.defer();
        if (userRole === 'customer') {
            AppointmentModel.find(
                {
                    customerId: userId
                },
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
        } else if (userRole === 'professional') {
            AppointmentModel.find(
                {
                    professionalId: userId
                },
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
        }
        return deferred.promise;
    }

    function deleteAppointment(appointmentId) {
        var deferred = q.defer();

        AppointmentModel.remove(
            {
                _id: appointmentId
            },
            function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function  findAppointmentById(appointmentId) {
        var deferred = q.defer();

        AppointmentModel.find(
            {
                _id: appointmentId
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }


    function updateStatusToCompleted(appointmentId) {
        var deferred = q.defer();

        AppointmentModel.update(
            {
                _id: appointmentId,
                status: 'booked'
            },
            {
                status : 'completed'
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateStatusToBooked(appointmentId, customerId, service) {
        var deferred = q.defer();
        AppointmentModel.findOneAndUpdate(
            {
                _id: appointmentId,
                status: 'available'
            },
            {
                customerId: customerId,
                status: 'booked',
                service: service
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //function findAppointmentByStatus(user , status) {
    //    if(user.role === 'customer') {
    //        AppointmentModel.find({
    //            customerId: user._id,
    //
    //        })
    //    }
    //
    //}
}