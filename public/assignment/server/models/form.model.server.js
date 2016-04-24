
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
        var deferred = q.defer();

        FormModel.remove({_id :formId}, function (err, doc) {
            if (err) {
                console.log("Error when deleting form" + err);
                deferred.reject(err);
            } else {
                console.log("Success - form deleted :" + doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, formFieldsToBeUpdated) {
        console.log("Current Form to be updated: " + formId);
        console.log("New fields to be updated : " + formFieldsToBeUpdated);
        var deferred = q.defer();

        FormModel.update({_id : formId},
            {
                $set: formFieldsToBeUpdated
            } , function (err, doc) {
            if (err) {
                console.log("Error when updating form" + err);
                deferred.reject(err);
            } else {
                console.log("Success form updated :" + doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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
        var deferred = q.defer();
        FormModel.find({title: title},
            function(err, docs) {
                if(err) {
                    deferred.reject(err);
                } else {
                    console.log("Forms " + docs);
                    deferred.resolve(docs);
                }
            });
        return deferred.promise;
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

