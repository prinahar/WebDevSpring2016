var mock = require("./form.mock.json");

module.exports = function(app) {
    var api = {
        createFormForUser : createFormForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findAllFormsForUser : findAllFormsForUser,
        findFormByTitle : findFormByTitle,
        findFormById : findFormById

    }
    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id : (new Date).getTime().toString(),
            title : form.title,
            userId : parseInt(userId),
            fields : []
        }
        mock.push(newForm);
        return newForm;
    }

    function deleteFormById(formId) {
        for(var formIndex in mock) {
            var form = mock[formIndex];
            if(form._id === formId) {
                var userId = form.userId;
                mock.splice(formIndex, 1);
                var forms = findAllFormsForUser(userId);
                return forms;
            }
        }
        return null;
    }

    function updateFormById(formId, newForm) {
        for(var formIndex in mock) {
            var form = mock[formIndex];
            if (form._id === formId) {
                if(newForm.title) {
                    form.title = newForm.title;
                }
                if(newForm.fields) {
                    form.fields = newForm.fields;
                }
                var forms = findAllFormsForUser(form.userId);
                return forms;
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        console.log("UserId: " + userId);
        var result = [];
        for(var formIndex in mock) {
            var form = mock[formIndex];
            if(form.userId === userId) {
                result.push(form);
            }
        }
        console.log("Forms from model ->" + result);
        return result;
    }

    function findFormByTitle(title) {
        for(var formIndex in mock) {
            var form = mock[formIndex];
            if(form.title === title) {
                return form;
            }
        }
        return null;
    }

    function findFormById(formId) {
        for(var formIndex in mock) {
            var form = mock[formIndex];
            if(form._id === formId) {
                return form;
            }
        }
        return null;
    }
}

