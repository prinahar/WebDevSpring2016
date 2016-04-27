var q = require("q");

module.exports = function (db, mongoose) {

    var CustomerSchema = require("./customer.schema.server.js")(mongoose);
    var CustomerModel = mongoose.model('Customer', CustomerSchema);

    var api = {
        createCustomer : createCustomer,
        findAllCustomers : findAllCustomers,
        loginUserByCredentials : loginUserByCredentials,
        updateCustomer: updateCustomer,
        findUserById:findUserById
    };
    return api;

    function createCustomer(customer) {
        var deferred = q.defer();
        CustomerModel.create(customer, function(err, doc){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function loginUserByCredentials(credentials) {
        var deferred = q.defer();
        console.log("Finding in customer model");
        CustomerModel.findOne(
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

    function findAllCustomers() {
        var deferred = q.defer();
        console.log("Finding all customers in model");
        CustomerModel.find(
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

    function updateCustomer(userId, user)
    {
        var deferred = q.defer();
        CustomerModel.findOneAndUpdate(
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

        CustomerModel.findById(userId, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}