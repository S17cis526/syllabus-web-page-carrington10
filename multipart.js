// a module for processing multipart HTTP requests
@module //multipart
"use strict;"

module.exports = multipart;

const DOUBLE_CLRF = Buffer.from(0x0D,0x0A,0x0D,0x0A)
// takes a request and response object
// parses the body of the multipart request
// and attaches its content to the request
// object . If an error occurs, we log it and send a 500 status code.
//otherwise  we invoke next with the request and response

@function //processBody
function multipart(req,res,next){

} // end of funciton body
// takes a buffer and a boundary and returns a
// assocataivue array of key value pairs if conternt
// is a file value will be an object with properties filename, content type, and
// data
function processBody(buffer,boundary,callback){
  var contents = []
var start = buffer.indexOf(boundary) + boundary.length + 2;// finds the first instance but we want the start
var end = buffer.indexOf(boundary, start);
while(end > start){
  content.push(buffer.slice(start, end));
start = end + boundary.length + 2
end = buffer.indOf(boundary, start);
}

// to be at the end
}// end of function for process

@function // parse content
// parses a content section and returns the key/value pair as a two element array
function parseContent(content,callback){
var index = content.indexOf(DOUBLE_CLRF);
var head = content.slice(0,index).toString();
var body = content.slice(index+4);
var name = /name="([\w\d\-_])"/.exec(head);
var filename = /filename="([\w\d\-)\.])"/.exec(head);
var contentType = /Con([w\d\/]+)/.exec(head);
if(!name) return callback("Content withougt name");

if(filename){
 callback(,false[name[1],{
   filename: filename[1],
   contentType: (contentType)?contentType[1]:'application/octet-st',
   data: body
 }]);
  // we have a file
}
else{
  return [name[1], body.toString()]// we have avalue
}
}
