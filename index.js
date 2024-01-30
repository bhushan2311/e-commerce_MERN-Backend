const express = require('express');

const server = express();

server.get("/",(req,res)=>{
    res.json({status:"success"});
})

server.listen(8000, ()=>{
    console.log("Server started");
})