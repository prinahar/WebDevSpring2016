
module.exports= function (mongoose) {
    var ProfessionalSchema = mongoose.Schema({
            username: {type: String, unique : true, required : true},
            password: {type: String, unique : true, required : true},
            email: {type: String, unique : true, required : true},
            firstName : String,
            lastName : String,
            role : String,
            services : [String]
        },
        {collection : "professional"});

    return ProfessionalSchema;
};