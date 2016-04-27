module.exports = function(app, customerModel) {

    app.post('/api/project/customer', registerCustomer);
    app.put("/api/project/customer/:id", updateCustomer);

    function registerCustomer(req, res) {
        var customer = req.body;
        console.log("On Server side - got the customer to register from client -> " + customer);
        customerModel.createCustomer(customer)
            .then(
                function(customer) {
                    res.json(customer);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateCustomer(req, res) {
        var customerId = req.params.id;
        var updatedCustomer = req.body;

        customerModel.updateCustomer(customerId, updatedCustomer)
            .then(
                function (doc) {
                    return customerModel.findAllCustomers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (customers) {
                    res.json(customers);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }



}