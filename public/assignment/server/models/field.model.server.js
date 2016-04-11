var q = require("q");

module.exports = function(db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    //create high-level API to talk to DB - DAO
    //create field model from schema
    var FieldModel = mongoose.model('Field', FieldSchema);

    var api = {
        createField : createField
    }
    return api;

    function createField(field) {
        // use q to defer the response
        var deferred = q.defer();

        FieldModel.create(field, function(err, doc){
            if(err) {
                console.log("Error when creating field: " + err);
                deferred.reject(err);
            } else {
                console.log("Success when creating field: " + doc);
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;
    }

}

