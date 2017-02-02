"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var fs = require('fs');
var port = 4000;
 var stylesheet = fs.readFileSync('gallery.css');
function getImageNames(callback){

   fs.readdir('images/',function(err,fileNames){
           if(err)
           {
              callback(err,null);
           }// if err
           else {
               calback(false,fileNames);
           }// end of if we have our iles name

   });// end of read dir
} // end of getImageNames

function imageNamestoretags(fileNames){
    fileNames.map(function(filename){

    return'<img src="' + filename +'" alt="a fishing ace at work">'
}
  }// end of store tags
 var imageNames = ['ace.jpg','fern.jpg', 'chess.jpg']
function serveImage(filename, req, res) {
  fs.readFile('images/' + filename , function(err, data) {
    if (err) {
      console.error(err);
      res.statusCode =404;
      res.statusMessage = "Resource not found";
      res.end()
      return;;
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.end(body);
  });
}//
buildGallery(imageTags){
  var html = '<!doctype' ;
  html+= '<head><Title> Gallery</title>'
  html+= '<link href= "gallery.css" rel="stylesheet" type="text/css">'
  html+= '</head>';
  html+='<body>';
  html+='<h1>Gallery </h1>';
 html+= imageNamestoretags(imageTags).join('');
  html+= '<h1>Hello.</h1> Time is ' + Date.now();
  html+='</body>';
  return html;
}; // builds page
serveGallery(req,res){
getImageNames(function(err,imageNames){

  if(err) {
    console.error(err)
    res.statusCode = 500;
    res.statusMessage = 'Server error';
    res.end
    return;
  }// end of err
  res.setHeader('Content-Type','text/html');
  res.end(buildGallery(imageNames));
});// end of call back function

} // end of serve galler invoe
var server = http.createServer((req, res) => {

  switch (req.url) {
    case '/':
    case '/gallery':
    serveGallery()
    break;
      case '/gallery.css':
      res.setHeader('Content-type','text/css')
      res.end(stylesheet);
    default:
    serverImage(res.url,req,res);
  }

});

server.listen(port, () => {
  console.log("Listening on Port " + port);
});
