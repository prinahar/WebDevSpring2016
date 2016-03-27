(function (){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, $scope, $rootScope, FieldService) {
        var formId = $routeParams.formId;

        $scope.addField = addField;
        $scope.updateField = updateField;
        $scope.removeField = deleteField;
        $scope.editField = editField;
        $scope.modalField = {};
        $scope.fields=[];


        initialDisplayOfForms();


        function initialDisplayOfForms(){
            console.log(formId);
            getFieldsForForm(formId);
        }


        function getFieldsForForm(formId) {

            FieldService.getFieldsForForm(formId)
                .then(
                    function (response) {
                        $scope.fields = response.data;
                        console.log("Fields: " + $scope.fields);
                    }
                )
        }


        function addField(fieldType) {

            var field;

            console.log("fieldType:"+fieldType);

            if(!fieldType) {
                return;
            }

            if(fieldType == "singleLineText"){
                field = {
                    "label": "New Text Field",
                    "type": "TEXT",
                    "placeholder": "New Field"
                };

            }

            if(fieldType == "singleLineText"){
                field = {
                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field"
                };
            }

            if(fieldType == "date"){

                field = {
                    "label": "New Date Field",
                    "type": "DATE"
                };


            }

            if(fieldType == "dropdown"){

                field = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };

            }


            if(fieldType == "checkbox"){

                field = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };

            }

            if(fieldType == "radioButtons"){

                field = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };

            }

            FieldService.createFieldForForm(formId, field)
                .then(
                    function (response) {
                        console.log(response.data);
                        $scope.fields = response.data;
                        getFieldsForForm(formId);
                    }
                )

        }



        function editField(fieldId) {

            FieldService.getFieldForForm(formId,fieldId)
                .then(
                    function (response) {
                        $scope.modalField = response.data;
                        console.log($scope.modalField);
                    }
                );

        }

        function updateField(newField) {
            if(newField.options){
                newField.options = JSON.parse(newField.options);
            }

            FieldService.updateField(formId,newField._id,newField)
                .then(
                    function (response) {
                        console.log(response.data);
                        $scope.modalField = response.data;
                        getFieldsForForm(formId);
                    }
                );
        }

        function deleteField(fieldId) {
            FieldService.deleteFieldFromForm(formId,fieldId)
                .then(
                    function (response) {
                        $scope.fields = response.data;
                    }
                );
        }

    }
})();