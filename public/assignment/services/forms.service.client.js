(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($rootScope) {
       var model = {
           forms : [
               {"_id": "000", "title": "Contacts", "userId": 123},
               {"_id": "010", "title": "ToDo", "userId": 123},
               {"_id": "020", "title": "CDs", "userId": 234}
           ]
       }

        var service =
        {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id : (new Date).getTime(),
                title : form.title,
                userId : userId
            }
            model.forms.push(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var result = [];
            for(var f in model.forms) {
                var form = model.forms[f];
                if(form.userId == userId) {
                    result.push(form);
                }
            }
            return result;
        }

        function deleteFormById(formId, callback) {
            for(var f in model.forms) {
                var form = model.forms[f];
                if(form._id == formId) {
                    model.forms.splice(f, 1);
                }
            }
        }

        function updateFormById(formId, newForm, callback) {
            for (var f in model.forms) {
                var form = model.forms[f];
                if (form._id == formId) {
                    form.title = newForm.title;
                    form.userId = newForm.userId;
                }
            }
        }
    }
})();