module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormForId);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormWithUserId);
    app.put("/api/assignment/form/:formId", updateForm);

    function getAllFormsForUser(req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId)
            .then(
                function(docs) {
                    res.send(docs);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormForId(req, res) {
        var id = req.params.formId;
        formModel.findFormById(id)
            .then(
                function(doc) {
                    res.send(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function(doc) {
                    console.log("Successfully deleted form");
                    res.send(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormWithUserId(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createFormForUser(userId ,form)
            .then(
                function(doc) {
                    res.send(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;

        formModel.updateFormById(formId, {
                title : newForm.title
            })
            .then(
            function(doc) {
                res.send(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }
}