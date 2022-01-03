
const db= require('./config/mongoose');
const Item = require('./models/item');


var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();


app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



 var todolist=[
     {
         description: "bring vegetables"
     },
     {
        description: "complete assignment"
     },
     {
        description: "college work"
     }
     
 ]
app.get("/",function(req,res)
{
   Item.find({},function(err, description2){
       if(err)
       {
           console.log("error in fetching the description");
           return;
       }

       return res.render('todo',{
        newListitems: description2,
        title: "todo list"
   });
});
      
      //res.render("todo",{newListItems:i1});
      //}
   //})
  
});
app.post("/",function(req,res)
{
   /*i=req.body.n;
   i1.push(i);
  //console.log(i);
  res.redirect("/");*/
  Item.create({
    description: req.body.description,
    category: req.body.xyz,
    date: req.body.date
    
    
    }, function(err, newItem){
     if(err){
        console.log('Error!',err)
        return;}
        console.log('******', newItem);
        return res.redirect('back');
});


 

  

 // i1.push(i);
  //res.redirect("/");
});
app.post('/delete-item/', function(req, res){
    console.log(req.body)

    Object.keys(req.body).forEach(function(key) {
        Item.findByIdAndDelete(key, function(err){
            if(err){
                console.log('Error in deleting an object from database');
                return res.redirect('back');;
            }
        });
    });
    return res.redirect('back');


   
});


app.listen(8000,function()
{
    console.log("Server is listening to port 8000");
})