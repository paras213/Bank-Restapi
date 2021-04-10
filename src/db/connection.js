const mongoose =require("mongoose");

mongoose.connect("mongodb://localhost:27017/account-test",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection is successful with Mogodb");
}).catch((e)=>{
    console.log("Connection is not successful with Mongodb");
})