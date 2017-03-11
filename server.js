var express = require('express');
 var morgan = require('morgan');
 var path = require('path');
 var pool=require("pg").pool;
 var crypto=require("crypto");
 
 var config={
     user:'deshmukhsuraj',
     database:'deshmukhsuraj',
     host:'db.imad.hasura-app.io',
     port:'5432',
     password:process.env.DB_PASSWORD
 };
 
 var app = express();
 app.use(morgan('combined'));
 
 app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'index.html'));
 });
 var pool=new pool(config);
 
  app.get("/user.db",function(req,res){
      pool.query('select * from user',function(err,result){
          if(err)
          {
              res.status(500).send(err.toString());
          }
          else
          {
           res.status(JSON.stringify(result));   
          }
      });
 });
 app.get("/ Article-Two.html",function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'Article-Two.html'));
 });
 app.get("/ Article-Three.html",function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'Article-Three.html'));
  
 });
 function hashcode(input,salt){
     var hashed=crypto.pdkdf25Sync(input,salt,10000,512,'sha512');
     return hashed.toString('hex');
     
 }
app.get('/hash/:input',function(req,res){
  var passwordString=hash(req.params.input,'this is some random string');
  res.send(passwordString);
});



     
 app.get("/ Article-Four",function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'Article-Four.html'));
 });
 app.get('/ui/style.css', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'style.css'));
 });
 
 app.get('/ui/madi.png', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'madi.js'));
 });
 
 
 var port = 8080; // Use 8080 for local development because you might already have apache running on 80
 app.listen(8080, function () {
   console.log(`IMAD course app listening on port ${port}!`);
 });