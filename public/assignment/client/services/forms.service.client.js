(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($rootScope, $http) {
       //var model = {
       //    forms : [
       //        {"_id": "000", "title": "Contacts", "userId": 123},
       //        {"_id": "010", "title": "ToDo", "userId": 123},
       //        {"_id": "020", "title": "CDs", "userId": 234}
       //    ]
       //}

        var service =
        {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };
        return service;

        function createFormForUser(userId, form) {
           return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
})();