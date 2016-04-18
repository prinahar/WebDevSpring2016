
module.exports = function(app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.findFormById(formId)
            .then(
                function(doc) {
                    doc.fields.push(field);
                    doc.save(function(err, doc) {
                        if (err) {
                            console.log("Saving doc during error: " + err)
                            res.status(400).send(err);
                        }
                        else {
                            console.log("Updated doc: " + doc)
                            res.send(doc.fields);
                        }
                    })

                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldsForForm(req, res){
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function(doc) {
                    res.send(doc.fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function getFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        console.log(" Type of fieldId: " + typeof fieldId);
        console.log("Field: " + fieldId);
        formModel.findFormById(formId)
            .then(
                function(doc) {
                    var currFields = doc.fields;
                    for (var i in currFields) {
                        console.log("Index: " + i + " FieldId: " + currFields[i].id + " Type: " + typeof currFields[i].id)
                        if (fieldId === currFields[i].id) {
                            var field = currFields[i];
                            res.send(field);
                            console.log("Field from server service: " + field);
                            return;
                        }
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldFromForm(req, res){

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        console.log("Reached server side delete function for field id " + fieldId);
        formModel.findFormById(formId)
            .then(
                function(doc) {
                    var fields = doc.fields;
                    console.log("Fields of form : " + fields);
                    for (var i in fields) {
                        var field = fields[i];
                        console.log("*****" + field);
                        if (fieldId === field._id.toString()) {
                            console.log("*****");
                            fields.splice(i, 1);
                            console.log("After Splice fields length :"+ fields.length);
                            console.log("Fields after delete " + fields);
                            formModel.updateFormById(formId, {
                                    fields : fields
                                })
                                .then(
                                    function(doc) {
                                    console.log("After delete and update "+ doc);
                                    res.send(doc);
                                },
                                    function(err) {
                                        res.status(400).send(err);
                                    }
                                );

                        }
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //    getFieldForForm(req, res)
    //    var form = formModel.findFormById(formId);
    //    var fields = form.fields;
    //    for(var i in fields) {
    //        if (fieldId === fields[i]._id) {
    //            fields.splice(i, 1);
    //            getFieldsForForm(req, res);
    //        }
    //    }
    //}

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        console.log("Server Services -> form id ->"+ formId + " field id ->" + fieldId);
        formModel.findFormById(formId)
            .then(
                function(doc) {
                    var fields = doc.fields;
                    for(var i in fields) {
                        var field = fields[i];
                        if (fieldId === field.id) {
                            if (newField.label) {
                                fields[i].label = newField.label;
                            }
                            if (newField.options) {
                                fields[i].options = newField.options;
                            }
                            if (newField.placeholder) {
                                fields[i].placeholder = newField.placeholder;
                            }
                        }
                    }
                    doc.save(function(err, doc){
                        if (err) {
                            console.log("Saving doc during error: " + err)
                            res.status(400).send(err);
                        }
                        else {
                            console.log("Updated new doc: " + doc)
                            res.send(doc.fields);
                        }
                    });

                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
}