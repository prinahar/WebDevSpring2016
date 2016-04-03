
module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);

        var field = req.body;
        field._id = new Date().getTime();
        form.fields.push(field);

        res.send(form);
    }

    function getFieldsForForm(req, res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        res.send(fields);
    }

    function getFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for(var i in fields){
            if(fieldId === fields[i]._id) {
                var field = fields[i];
                res.send(field);
            }
        }
    }

    function deleteFieldFromForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for(var i in fields) {
            if (fieldId === fields[i]._id) {
                fields.splice(i, 1);
                getFieldsForForm(req, res);
            }
        }
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        console.log("Server Services -> form id ->"+ formId + " field id ->" + fieldId);
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for(var i in fields) {
            var field = fields[i];
            if (fieldId === field._id) {
                if (newField.label) {
                    field.label = newField.label;
                }
                if (newField.type) {
                    field.type = newField.type;
                }
                if (newField.placeholder) {
                    field.placeholder = newField.placeholder;
                }
                res.json(field);
            }
        }
    }
}