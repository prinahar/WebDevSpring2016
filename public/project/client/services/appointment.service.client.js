(function() {
    angular
        .module("OnDemandApp")
        .factory("AppointmentService", AppointmentService);

    function AppointmentService($rootScope, $http) {
        var service = {
            findAppointmentsByUser: findAppointmentsByUser,
            createAvailAppointment: createAvailAppointment,
            bookAppointment: bookAppointment,
            completeAppointment: completeAppointment
            //deleteAppointment: deleteAppointment

        }
        return service;

        function findAppointmentsByUser(id, role) {
            var info = {
                userId: id,
                userRole: role
            }
            return $http.post("/api/project/appointments/user", info);

        }

        function createAvailAppointment(appointment) {
            return $http.post("/api/project/appointment", appointment);
        }

        //function deleteAppointment(userId, role, appointmentId) {
        //    $http.delete("api/project/user?id=" + userId + "&role=" + role + "&appointment=" + appointmentId);
        //}

        function completeAppointment(appointmentId) {
            return $http.put("/api/project/appointment/" + appointmentId);
        }

        function bookAppointment(customerId, appointmentId, service) {
            var info = {
                customerId: customerId,
                appointmentId: appointmentId,
                service: service
            }
            return $http.put("/api/project/appointment", info);

        }
    }

})();