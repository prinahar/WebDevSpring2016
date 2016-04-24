var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require("mongoose");

module.exports = function (app, userModel) {

    var auth = authorized;


    //app.post('/api/assignment/user', registerUser);
    //app.get('/api/assignment/user', getUser);
    //app.get('/api/assignment/user/:id', getUserById);
    app.get('/api/assignment/users', findUsers);
    app.post('/api/assignment/user', auth, createUser);
    app.put('/api/assignment/user/:id',auth,  updateUser);
    app.delete('/api/assignment/user/:id', auth, deleteUserById);
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/loggedin', loggedin);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .loginUserByCredentials({username: username, password: password})
            .then(
                function (user) {

                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);

                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function registerUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(
                //if promise resolved
                function (doc) {
                    //req.session.user = doc;
                    res.send(doc);
                },
                //send error if promise rejected
                function (err) {
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
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //function getAllUsers(req, res) {
    //    userModel.findAllUsers()
    //        .then(
    //            function (docs) {
    //                console.log("fetching all users");
    //                res.send(docs);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function getUser(req, res) {

        if (req.query.username && req.query.password) {
            console.log("UserServer Service -> getting user");
            return getUserByCredentials(req, res);
        }
        else if (req.query.username) {
            return getUserByUsername(req, res);
        }
        else {
            return findUsers(req, res);
        }
    }

    function findUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function (docs) {
                    console.log("fetching all users");
                    res.send(docs);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;

        if (!isAdmin(req.user)) {
            delete updatedUser.roles;
        }
        if (typeof updatedUser.roles == "string") {
            updatedUser.roles = updatedUser.roles.split(",");
        }
        userModel.updateUser(userId, updatedUser)
            .then(
                function (doc) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }


    function deleteUserById(req, res) {
        if (isAdmin(req.user)) {
            var userId = req.params.id;
            console.log("Deleting in server service" + userId);
            userModel.deleteUserById(userId)
                .then(
                    function (doc) {
                        console.log("Going to find all users after delete");
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function createUser(req, res) {
        if (isAdmin(req.user)) {
            var user = req.body;
            userModel.createUser(user)
                .then(
                    function (doc) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        console.log("Sending all userd after creating new user in server service");
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function login(req, res) {
        var user = req.user;
        res.send(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function serializeUser(user, done) {
        console.log("serializing");
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("deserializing");
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function isAdmin(user) {
        if (user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

}