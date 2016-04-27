module.exports = function(app, professionalModel) {

    app.post('/api/project/professional', registerProfessional);
    app.put('/api/project/professional/:id', updateProfessional);
    app.get('/api/project/professional', findAllProfessionals);



    function registerProfessional(req, res) {
        var professional = req.body;
        console.log("On Server side - got the professional to register from client -> " + professional);
        professionalModel.createProfessional(professional)
            .then(
                function(professional) {
                    res.json(professional);
                },
                function(err) {
                    console.log("Error while creating professional");
                    res.status(400).send(err);
                }
            );
    }

    function updateProfessional(req, res) {
        var professionalId = req.params.id;
        var updatedProfessional = req.body;

        if (typeof updatedProfessional.services == "string") {
            updatedProfessional.services = updatedProfessional.services.split(",");
        }
        professionalModel.updateProfessional(professionalId, updatedProfessional)
            .then(
                function (doc) {
                    return professionalModel.findAllProfessionals();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (professional) {
                    res.json(professional);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findAllProfessionals(req, res) {
        professionalModel.findAllProfessionals()
            .then(
                function (docs) {
                    console.log("fetching all Professionals from model");
                    res.send(docs);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


}