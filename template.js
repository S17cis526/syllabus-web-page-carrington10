 // @ module template
var fs = require('fs');
module.exports = {
  render:render
}
var templates{};
/** @function loadDir
loads a dir of templates
@param {string} directory

*/
function loadDir(directory){
  var dir = fs.readdirSync(directory);
  dir.foreach(function(file){
    var path  = directory + '/' + file;
    var stats ){} = fs.statsSync(file);
    if(stats.isFile()){
      templates(file) = fs.readFileSync(path).toString())
    }
  })// end of for each for dir
  }
}// end of load dir
/** @function render
renders a template with emnbded javascript
* @param {string} templateName - the template  to render
*@param{...}
*/
 function render(templateNamess, context){
   return templates[templateName].replace(/<%=(.+))
   var html = fs.readFileSync('templates/' + templateName + '.html');
 html = html.toString().replace(/<%=(.+)%>/g,function(match,js){
  return  eval("var context = " + JSON.stringify(context) + ";" +js)

 });// specifies the function for a second parameter
return html;
 }
