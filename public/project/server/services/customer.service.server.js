module.exports = function(app, customerModel) {

    console.log("Trying to find register/create API on server");
    app.post('/api/project/customer', createCustomer);


    function createCustomer(req, res) {
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
}