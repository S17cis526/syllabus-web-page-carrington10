"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var Url = require('url');
var fs = require('fs');
var port = 8000;
var title =  'Gallery';
var config = (fs.readFileSync('config.json'));

var stylesheet = fs.readFileSync('gallery.css');

var imageNames = ['ace.jpg', 'bubble.jpg', 'chess.jpg', 'fern.jpg', 'mobile.jpg'];

function getImageNames(callback) {
  fs.readdir('images/', function(err, fileNames) {
    if (err) callback(err, undefined);
    else callback(false, fileNames);
  });
}

function imageNamesToTags(fileNames) {
  return fileNames.map(function(fileName) {
    return `<img src="${fileName}" alt="${fileName}">`;
  });
}

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

function buildGallery(imageTags) {
  var html =  '<!DOCTYPE html>';
      html += '<head>';
      html += '<title>'+ config.title + '</title>';
      html += '<link rel="stylesheet" type="text/css" href="gallery.css">';
      html += '</head>';
      html += '<body>';
        html += '<h1>Gallery</h1>';
        html+= '<form action="">'
        html+= ' <input type="text"text" name="tltle">';
        html+= ' <input type="submit" value="Change Gallery Title">'
        html+='</form>'
        html += imageNamesToTags(imageTags).join('');
        html+= '<form action="" method="POST">';
        html+= '<input type="file" name="image">'
        html+=' <input type="submit" value="Upload Image">'
        html+= '</form>'
      html += '</body>';

  return html;
}

function serveGallery(req, res) {
  getImageNames(function(err, imageNames) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.statusMessage = 'Server error';
      res.end();
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.end(buildGallery(imageNames));
  })
}
 function uploadImage(req ,res) {
req.on('error', function(){
  var body;
  res.statusCode = 500;
  res.end();

});
 req.on('data', function(data){
   body+= data;
 })
 req.on('end',function(){
   fs.writeFile('filename',data, function(err){
      if(err)
      {
        console.log(err)
      }
      res.statusCode = 500;
      res.end()
      return;
   });
   serveGallery(req,res);
 });

 }// end of upload pic
var server = http.createServer((req, res) => {

  var Urlparts = Url.parse(req.url);
var url = req.url.split('?'); // at most we should have 2 question marks
// a resource and a query string separated by a?
var resource = url[0];
var queryString = url[1];
var url;

if(Urlparts.query)
{
  var matches= /title=(.+)($|&)/.exec(Urlparts.query);
  if(matches&& matches[1]){
    config.title = decodeURIComponent(matches[1]);
    fs.writeFile('config.json',JSON.stringify(config) });
  }// en dof if statement
}
  switch (Urlparts.pathname) {
    case "/":
    case "/gallery":
    if(req.method == 'GET') {
      serveGallery()
    }
    else if (req.method == 'POST'){
      uploadPicture(req,res);
      }
      serveGallery(req, res);
      break;
    case "/gallery.css":
      res.setHeader('Content-Type', 'text/css');
      res.end(stylesheet);
      break;
    default:
      serveImage(req.url, req, res);
  }

});

server.listen(port, () => {
  console.log("Listening on Port " + port);
});
