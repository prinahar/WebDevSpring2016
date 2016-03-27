
module.exports = function(app, userModel) {

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', getUser);
    app.get('/api/assignment/user/:id', getUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user);
        var users = userModel.findAllUsers();
        res.send(users);
    }

    function getUser(req, res) {
        console.log("Query: " + req.query);
        if(req.query.username && req.query.password) {
            return getUserByCredentials(req, res);
        } else if (req.query.username) {
            return getUserByUsername(req, res);
        } else {
            return getAllUsers(req, res);
        }
    }

    function getAllUsers(req, res) {
        res.send(userModel.findAllUsers());
    }

    function getUserById(req, res) {
        var userId = req.params;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = userModel.findUserByCredentials(username, password);
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params;
        var updatedUser = req.body;
        var user = userModel.updateUser(userId, updatedUser);
        res.send(updatedUser);
    }

    function deleteUserById(req, res) {
        var userId = req.params;
        userModel.deleteUserById(userId);
        var users = userModel.findAllUsers();
        res.send(users);
    }

}