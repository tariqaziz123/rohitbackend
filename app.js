const express = require("express");
const mongoose = require("mongoose");
const routes=require("./Routes/index");
const cors = require("cors")

const app=express();

const host = '0.0.0.0';
const port =process.env.PORT || 2001;

app.use(cors());
app.options("*",cors())

app.use(express.json())
app.use('/',routes);

mongoose.connect("mongodb+srv://rohithdb:rohithdb@cluster0.esdct.mongodb.net/TestDB?retryWrites=true&w=majority",
{ useNewUrlParser: true , useUnifiedTopology: true })
.then(res=>{
    app.listen(port,host,()=>{
    console.log(`Server is running on ${host}:${port}`);
    })
})
.catch(err =>console.log(err));
