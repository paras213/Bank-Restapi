const mongoose =require("mongoose");
const validator = require("validator");

//this is the schema
const accountSchema = new mongoose.Schema({
    firstname:{
                type:String,
                required:true,

    },
    lastname:{
                type:String,
                required:true,
    },
     
    email:{
            type:String,
            required:true,
            unique:[true,"Email id is already present in the database with an Account"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error ("Invalid Email")
                }
            }

    },
    address:{
                type:String,
                required:true

    },
    balance:{
            type:Number
    }

})


//Model is defined here
const Account = new mongoose.model("Account",accountSchema);

module.exports = Account;