module.exports = function (app,appointmentModel, customerModel,professionalModel) {
    app.post("/api/project/appointments/user", findAppointmentsByUser);
    app.post("/api/project/appointment", createAvailAppointment);
    app.put("/api/project/appointment", bookAppointment);
    app.put("/api/project/appointment/:appointmentId", completeAppointment);

    //created by professional by selecting available times
    function createAvailAppointment(req, res) {
        var appointment = req.body;//should contain prof id and time
        appointment.status = 'available';
        console.log("After setting it to available")
        console.log(appointment);
        appointmentModel.createAppointment(appointment)
            .then(
                function (doc) {
                    console.log("Sending back from service server!")
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function bookAppointment(req, res) {
        var customerId = req.body.customerId;
        var appointmentId = req.body.appointmentId;
        var service = req.body.service;
        appointmentModel.updateStatusToBooked(appointmentId, customerId, service)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    //
    //function updateAvailability(req, res) {
    //    var appointment = req.body;//should contain prof id and time
    //    appointmentModel.findAppointmentById(appointment._id)
    //        .then(
    //            function (doc) {
    //                //if appointment booked Professional cannot delete
    //                if(doc.status == 'booked') {
    //                    res.json({status: "booked"})
    //                } else  {
    //                    res.json({status: "deleted"})
    //                }
    //}

    function findAppointmentsByUser(req, res) {
        var info = req.body;
        appointmentModel.findAppointmentsByUser(info.userId, info.userRole)
            .then(
                function (docs) {
                    res.json(docs);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //function deleteAppointment(req, res) {
    //    var role = role;
    //    var userId = req.params.userId;
    //    var appointmentId = req.params.appointmentId;
    //    //Customer can delete an appointment
    //    if (role === 'customer') {
    //        appointmentModel.deleteAppointment(appointmentId)
    //            .then(
    //                function (doc) {
    //                    console.log("Deleted appointment")
    //                },
    //                function (err) {
    //                    res.status(400).send(err);
    //                });
    //    } else if (role === 'professional') {
    //
    //        appointmentModel.findAppointmentById(appointmentId)
    //            .then(
    //                function (doc) {
    //                    //if appointment booked Professional cannot delete
    //                    if (doc.status == 'booked') {
    //                        res.json({status: "booked"})
    //                    } else {
    //                        res.json({status: "deleted"})
    //                    }
    //                },
    //                function (err) {
    //                    res.status(400).send(err);
    //                });
    //    }
    //}

    function completeAppointment(req, res) {
        var appointmentId = req.params.appointmentId;

        appointmentModel.updateStatusToCompleted(appointmentId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )

    }
}
