var q = require("q");

module.exports = function (db, mongoose) {

    var CustomerSchema = require("./customer.schema.server.js")(mongoose);
    var CustomerModel = mongoose.model('Customer', CustomerSchema);

    var api = {
        createCustomer : createCustomer,
        findAllCustomers : findAllCustomers
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

    function findAllCustomers() {
        console.log("TODO: Find all customers");
    }
}