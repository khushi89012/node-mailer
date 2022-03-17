const express = require("express");

const connect = require("./configs/db");

const userController = require("./controllers/user.controller")

const app = express();

app.use(express.json());

app.use("/users", userController);

app.listen(2346, async () =>{
    try{
        await connect();
    }
    catch(e){
        console.log(e.message);
    }
    console.log("Listenin Port 2346")
})