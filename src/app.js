const express = require('express');
require("./db/connection");
const Account = require("./models/account");
const app = express();
const port=process.env.PORT || 3000;

app.use(express.json());


// post request to create a new account 
app.post("/account", async(req,res) => {
    try{
        const user = new Account(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e);
    }
        
})


//get request to read the all registered account
app.get("/account", async(req,res)=>{
    try{
        const regAccount = await Account.find();
        res.send(regAccount);
    }
    catch(e){
                res.status(404).send(e);
    }
})

//find the account by particular id
app.get("/account/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const idAccount = await Account.findById(_id);
        if(!idAccount){
            return res.status(404).send();
        }
        else{
            res.send(idAccount);
        }        
        
    }
    catch(e){
                res.status(500).send(e);

    }
})




function makeDeposit(account, amount) {
    account.balance = parseFloat((account.balance + amount).toFixed(2));
    return account;
}

//Deposit fund into a registered Account
app.post('/account/:id', async (req, res)=> {
    try{
        const _id = req.params.id ;
        const idAccount = await Account.findById(_id);
        
        let account = await Account.findByIdAndUpdate(_id,{balance:req.body.balance + idAccount.balance},{new:true});
        if (account !=={})
        {
        let amount = parseFloat(req.body.account);
        res.send(makeDeposit(account, amount));
        }
        else{
        res.status(404).send();
        }
    
    }
    catch(e){
        res.status(404).send(e);
    }    
})



function makeWithdraw(account, amount) {
    account.balance = parseFloat(( amount - account.balance).toFixed(2));
    return account;
}

// Withdraw fund From registered Account
app.patch('/account/:id', async (req, res)=> {
    try{
        const _id = req.params.id ;
        const idAccount = await Account.findById(_id);
   
        let account = await Account.findByIdAndUpdate(_id,{  balance: idAccount.balance -req.body.balance},{new:true});
        if (account !=={})
        {
        let amount = parseFloat(req.body.account);
        res.send(makeWithdraw(account, amount));
        }
        else{
            res.status(404).send();
        }

    }
    catch(e){
            res.status(404).send(e);
    }
})







app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
})