const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/usersDB",{ useUnifiedTopology: true ,useNewUrlParser: true});

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  position:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  jobType:{
    type:String,
    required:true
  },
  minSalary:{
    type:Number,
    required:true
  },
  industry:{
    type:String,
    required:true
  },
  minExperience:{
    type:Number,
    required:true
  },
  maxExperience:{
    type:Number,
    required:true
  },
  typeOfHiring:{
    type:String,
    required:true
  },
  seniorityLevel:{
    type:String,
    required:true
  }
});
const User=new mongoose.model("User",userSchema);

app.post("/searchResults",(req,res) => {
  User.findOne({name:req.body.name,
    position:req.body.position,
    location:req.body.location,
    minSalary:req.body.minSalary},
    (err,foundUsers) => {
    if(!err){
        if(foundUsers){
        res.send(foundUsers);
      }else{
        res.send("No user exists...");
      }
      }
      else{
        console.log(err);
      }
  });
});

app.listen(3000,() => {
  console.log("Server started successfully");
});
