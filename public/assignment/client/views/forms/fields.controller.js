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
        $scope.fields=[];
        $scope.field = {};
        $scope.fieldModal = {};


        init();


        function init(){
            console.log(formId);
            getFieldsForForm(formId);
        }


        function getFieldsForForm(formId) {
            FieldService.getFieldsForForm(formId)
                .then(
                    function (response) {
                        console.log("Fields before: " + JSON.stringify($scope.fields));
                        $scope.fields = response.data;
                        console.log("Fields after: " + JSON.stringify($scope.fields));
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
                $scope.field = field;

            }

            if(fieldType == "singleLineText"){
                field = {
                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field"
                };
                $scope.field = field;
            }

            if(fieldType == "date"){

                field = {
                    "label": "New Date Field",
                    "type": "DATE"
                };
                $scope.field = field;
            }

            if(fieldType == "dropdown"){

                field = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
                $scope.field = field;
            }


            if(fieldType == "checkbox"){

                field = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
                $scope.field = field;
            }

            if(fieldType == "radioButtons"){

                field = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
                $scope.field = field;
            }

            FieldService.createFieldForForm(formId, field)
                .then(
                    function (response) {
                        console.log(response.data);
                        $scope.fields = response.data;
                        //getFieldsForForm(formId);
                    }
                )

        }



        function editField(fieldId) {
            console.log("Got FieldID from field" + fieldId);
            FieldService.getFieldForForm(formId, fieldId)
                .then(
                    function (response) {
                        $scope.fieldModal = response.data;
                        $scope.field = response.data; //setting the field for update field function to access
                    }
                );

        }

        function updateField(newField) {
            if (newField) {
                //if (newField.options) {
                //    newField.options = JSON.parse(newField.options);
                //}

                FieldService.updateField(formId, $scope.field._id, newField)
                    .then(
                        function (response) {
                                console.log(response.data);
                                $scope.field = {};
                                $scope.fields = response.data;
                                //getFieldsForForm(formId);
                        }
                    );
            }
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