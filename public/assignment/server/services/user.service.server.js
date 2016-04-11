
module.exports = function(app, userModel) {

    app.post('/api/assignment/user', registerUser);
    app.get('/api/assignment/user', getUser);
    app.get('/api/assignment/user/:id', getUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUserById);

    function registerUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(
                //if promise resolved
                function(doc) {
                    //req.session.user = doc;
                    res.send(doc);
                },
                //send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(
                function(doc) {
                    res.send(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then (
                function(doc) {
                    res.send(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function(docs) {
                    res.send(docs);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUser(req, res) {

        if(req.query.username && req.query.password) {
            return getUserByCredentials(req, res);
        }
        else if (req.query.username) {
            return getUserByUsername(req, res);
        }
        else {
            return getAllUsers(req, res);
        }
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;
        userModel.updateUser(userId, updatedUser)
            .then(
                function(doc) {
                    res.send(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params;
        userModel.deleteUserById(userId);
        var users = userModel.findAllUsers();
        res.send(users);
    }

}