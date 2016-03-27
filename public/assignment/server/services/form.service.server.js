module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormForId);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormWithUserId);
    app.put("/api/assignment/form/:formId", updateForm);

    function getAllFormsForUser(req, res) {
        var userId = Number(req.params.userId);
        var forms = formModel.findAllFormsForUser(userId);
        res.send(forms);
    }

    function getFormForId(req, res) {
        var id = req.params.formId;
        var form = formModel.findFormById(id);
        res.send(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId)
        res.send(forms);
    }

    function createFormWithUserId(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var createdForm = formModel.createFormForUser(userId ,form);
        res.send(createdForm);
    }
    function updateForm(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var updatedForm = formModel.updateFormById(formId,newForm);
        res.send(updatedForm);
    }
}