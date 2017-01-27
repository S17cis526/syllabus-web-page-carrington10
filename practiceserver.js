"use strict";

//^^
 // server
//this file defines the server for a simple
// photo gallery web app
 var http = require('http');
// lets you upload imagesd
var fs = require('fs');
 var port = 3000;

 function serveImage(filename,req, res) {
   var body = fs.readFileSync('images/'+filename, function(err,body){
     if (err){
       console.error(err);
       res.statusCode = 500;
       res.statusMessage = "whoops";
       res.end("Silly me");
       return;
     }


   res.setHeader("Content-Type", "image/jpeg");
   // can only be done before the sponse
   res.end(body);
});

 }
var server = http.createServer((req,res) => {
  switch(req.url){
 case "/chess":
 serveImage('chess.jpg',req,res)
 break;

 default:
  res.statusCode = 404;
  res.statusMessage = "Not Found Pham";
res.end();
  }


 }); // end of create server function

server.listen(port, ()=>{
console.log("listening on Port "+ port);

}); // end of port  listining
