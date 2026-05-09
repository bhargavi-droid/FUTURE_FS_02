const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/minicrm")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Lead = require("./models/Lead");


// GET all leads

app.get("/leads", async(req,res)=>{

    const leads = await Lead.find();

    res.json(leads);

});


// ADD lead

app.post("/leads", async(req,res)=>{

    const newLead = new Lead(req.body);

    await newLead.save();

    res.json(newLead);

});


// DELETE lead

app.delete("/leads/:id", async(req,res)=>{

    await Lead.findByIdAndDelete(req.params.id);

    res.json({message:"Lead Deleted"});

});


app.listen(5000, ()=>{

    console.log("Server Running on Port 5000");

});