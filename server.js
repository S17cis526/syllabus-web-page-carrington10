"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var fs = require('fs');
var port = 4000;
 var stylesheet = fs.readFileSync('gallery.cs');

 var imageNamnes = ['ace.jpg','fern.jpg', 'chess.jpg']
function serveImage(filename, req, res) {
  fs.readFile('images/' + filename, function(err, body) {
    if (err) {
      console.error(err);
      res.statusCode == 500;
      res.statusMessage = "Whoops";
      return;
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.end(body);
  });
}

var server = http.createServer((req, res) => {

  switch (req.url) {
    case '/gallery':
    var gHtml = imageNames.map(function(filename){
    html+= '<img src="'filename'" alt="a fishing ace at work">'

  }).join(' ')
    var html = '<!doctype' ;
    html+= '<head><Title> Gallery</title>'
    html+= '<link href= "gallery.css" rel="stylesheet" type="text/css">'
    html+= '</head>';
    html+='<body>';
    html+='<h1>Gallery </h1>';
   html= gHtml;
    html+= '<h1>Hello.</h1> Time is ' + Date.now();
    html+='</body>';
    res.setHeader('Content-Type','text/html');
    res.end(html);
    break;
    case "/images/ace":
      serveImage('ace.jpg', req, res);
      break;
    case "/bubble":
      serveImage('bubble.jpg', req, res);
      break;
    case "/chess":
      serveImage('chess.jpg', req, res);
      break;
    case "/fern":
      serveImage('fern.jpg', req, res);
      break;
    case "/mobile":
      serveImage('mobile.jpg', req, res);
      break;
      case '/gallery.css':
      res.setHeader('Content-type','text/css')
      res.end(stylesheet);
    default:
      res.statusCode = 404;
      res.statusMessage = "Not found";
      res.end();
  }

});

server.listen(port, () => {
  console.log("Listening on Port " + port);
});
