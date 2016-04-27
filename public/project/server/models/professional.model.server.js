var q = require("q");
module.exports = function (db, mongoose) {

    var ProfessionalSchema = require("./professional.schema.server.js")(mongoose);
    var ProfessionalModel = mongoose.model('Professional', ProfessionalSchema);

    var api = {
        createProfessional: createProfessional,
        findAllProfessionals: findAllProfessionals,
        loginUserByCredentials: loginUserByCredentials,
        updateProfessional: updateProfessional,
        findUserById: findUserById
    };
    return api;

    function loginUserByCredentials(credentials) {
        var deferred = q.defer();
        console.log("Finding in professional model");
        ProfessionalModel.findOne(
            {
                username : credentials.username,
                password : credentials.password
            },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function createProfessional(professional) {
        var deferred = q.defer();
        ProfessionalModel.create(professional, function(err, doc){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllProfessionals() {
            var deferred = q.defer();
            console.log("Finding all professionals in model");
            ProfessionalModel.find(
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            )
            return deferred.promise;
        }

    function updateProfessional(userId, user)
    {
        var deferred = q.defer();
        ProfessionalModel.findOneAndUpdate(
            {_id: userId},
            user,
            {new: true},
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        ProfessionalModel.findById(userId, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}