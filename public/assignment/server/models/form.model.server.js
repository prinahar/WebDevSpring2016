var mock = require("./form.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create high-level API to talk to DB - DAO
    //create form model from schema
    var FormModel = mongoose.model('Form', FormSchema);

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
        form.userId = userId;

        // use q to defer the response
        var deferred = q.defer();

        FormModel.create(form, function(err, doc){
            if(err) {
                console.log("Error when creating form: " + err);
                deferred.reject(err);
            } else {
                console.log("Success when creating form: " + doc);
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;
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

        var deferred = q.defer();
        FormModel.find({userId: userId},
            function(err, docs) {
                if(err) {
                    deferred.reject(err);
                } else {
                    console.log("Forms from model ->" + docs);
                    deferred.resolve(docs);
                }
            });
        return deferred.promise;
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

        var deferred = q.defer();

        FormModel.findById(formId, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}

