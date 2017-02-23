/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
"use strict;"

/* global variables */
var multipart = require('./multipart');
var http = require('http');
var url = require('url');
var fs = require('fs');
var port = 3000;

/* load cached files */
var config = JSON.parse(fs.readFileSync('config.json'));
var stylesheet = fs.readFileSync('gallery.css');
var globalJ = {}
function getJson(req,res)
{
  fs.readdir('loadj', function(err,items) {
    if(err) {handleError(req, res, err); return;}
    else if(stats.isFile()) files.push(jsonloads)
    toProcess--;// end of to process
    var toProcess = jsonloads.length;
    var jsonloads = [];
    if(toProcess == 0) printContents(jsonloads);
  })// end of read dir function
}

function printContents(filename)
{
  var contents = fs.readFileSync("loadj/filename.json")
  console.log("starting pham  ")
  var jsonContent = JSON.parse(contents)
  console.log("Title",jsonContent.Url);
  console.log("Title:",jsonContent.Title);
  console.log("About:",jsonContent.Description);
  console.log("Date:",jsonContent.Date);
  console.log("done");
}// end of print Contents
/** @function getImageNames
 * Retrieves the filenames for all images in the
 * /images directory and supplies them to the callback.
 * @param {function} callback - function that takes an
 * error and array of filenames as parameters
 */
function getImageNames(callback) {
  fs.readdir('images/', function(err, fileNames){
    if(err) callback(err, undefined);
    else callback(false, fileNames);
  });
}

/** @function imageNamesToTags
 * Helper function that takes an array of image
 * filenames, and returns an array of HTML img
 * tags build using those names.
 * @param {string[]} filenames - the image filenames
 * @return {string[]} an array of HTML img tags
 */
function imageNamesToTags(fileNames) {
  return fileNames.map(function(fileName) {
    return `<img src="${fileName}" alt="${fileName}">`;
  });
}

/**
 * @function buildIndex
 * A helper function to build an HTML string
 * of a gallery webpage.
 * @param {string[]} anchors - the HTML for the individual
 * gallery images.
 */
 function buildJson(contents){
    var html = '<doctype html';
    html+="<h1>" +contents.Title + "</h1>";
    html+="<body>" +contents.Description ;
    html+="       " + contents.Date ;
    html+="</body>";
    return html;

 }//
function buildIndex(anchors) {
  var html =  '<!doctype html>';
      html += '<head>';
      html +=   '<title>' + config.title + '</title>';
      html +=   '<link href="gallery.css" rel="stylesheet" type="text/css">'
      html += '</head>';
      html += '<body>';
      html += '  <h1>' + config.title + '</h1>';
      html += '  <form method="GET" action="">';
      html += '    <input type="text" name="title">';
      html += '    <input type="submit" value="Change Gallery Title">';
      html += '  </form>';
      html += anchors.join('');
      html += ' <form action="" method="POST" enctype="multipart/form-data">';
      html += '   <input type="file" name="image">';
      html += '   <input type="submit" value="Upload Image">';
      html += ' </form>';
      html += '</body>';
  return html;
}

/** @function serveIndex
 * A function to serve a HTML page representing a
 * gallery of images.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function serveIndex(req, res) {
  var anchors = Object.getKeys(globalJ).map(function(key){
    buildJson(globalj[key];)
    return '<a href="'+globalj[key].Title+ '"><img src="' + globalj[key].Url + '"></a>"';
  });
  res.setHeader('Content-Type', 'text/html');
  res.end(buildIndex(anchors));
}

/** @function serveImage
 * A function to serve an image file.
 * @param {string} filename - the filename of the image
 * to serve.
 * @param {http.incomingRequest} - the request object
 * @param {http.serverResponse} - the response object
 */
function serveImage(fileName, req, res) {
  fs.readFile('images/' + decodeURIComponent(fileName), function(err, data){
    if(err) {
      console.error(err);
      res.statusCode = 404;
      res.statusMessage = "Resource not found";
      res.end();
      return;
    }
    res.setHeader('Content-Type', 'image/*');
    res.end(data);
  });
}

/** @function uploadImage
 * A function to process an http POST request
 * containing an image to add to the gallery.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function uploadImage(req, res) {
  multipart(req, res, function(req, res) {
    // make sure an image was uploaded
    console.log('filename', req.body.filename)
    if(!req.body.image.filename) {
      console.error("No file in upload");
      res.statusCode = 400;
      res.statusMessage = "No file specified"
      res.end("No file specified");
      return;
    }
    fs.writeFile('images/' + req.body.image.filename, req.body.image.data, function(err){
      if(err) {
        console.error(err);
        res.statusCode = 500;
        res.statusMessage = "Server Error";
        res.end("Server Error");
        return;
      }
      serveGallery(req, res);
    });
  });
}

/** @function handleRequest
 * A function to determine what to do with
 * incoming http requests.
 * @param {http.incomingRequest} req - the incoming request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
  // at most, the url should have two parts -
  // a resource and a querystring separated by a ?
  var urlParts = url.parse(req.url);

  if(urlParts.query){
    var matches = /title=(.+)($|&)/.exec(urlParts.query);
    if(matches && matches[1]){
      config.title = decodeURIComponent(matches[1]);
      fs.writeFile('config.json', JSON.stringify(config));
    }
  }

  switch(urlParts.pathname) {
    case '/':
    case '/index':
      if(req.method == 'GET') {
        serveIndex(req, res);
      } else if(req.method == 'POST') {
        uploadImage(req, res);
      }
      break;
    case '/gallery.css':
      res.setHeader('Content-Type', 'text/css');
      res.end(stylesheet);
      break;
    default:
      serveImage(req.url, req, res);
  }
}

/* Create and launch the webserver */
var server = http.createServer(handleRequest);
server.listen(port, function(){
  console.log("Server is listening on port ", port);
});
