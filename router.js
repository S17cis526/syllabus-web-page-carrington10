/** @module router */
module.exports=Router;
var url=require
function Router(){
  this._getRoutes=[];
  this.postRoutes=[];
}

Router.prototype.get=function(path,handler){
  var route=pathToRegularExpression(path);
  route.handler=handler;


}

function pathRegularExpression(path){
  var tokens=path.split('/');
  var keys=[];
  var parts =tokens.map(function(token){
    if(token.charAt(0)==":"){
      keys.push(token.slice(1));
      return"(\\w+)";
    }else{
      return token;
    }
  });
  var regexp=new RexExp('^' + parts.join('/')+ '/?$')
  return{
    regexp:regexp,
    keys:keys
  }
  }


Router.prototype.post=function(path,handler){
  this.postRoutes[path]=handler;
}

Router.proto.route= function(req,res){
var urlParts=url.parse(req.url);
  switch(req.method){
        case'get':
          for(var i=0;i<this._getRoutes.length;i++){

          var match=this._getRoutes[i].exec(urlParts.pathname);
          if(match){
            req.params={};
            for(var j=; j<matches.length;j++){
              req.params[]
            }
            for each key:
              insert key/value into params
            return this._getRoutes[i].handler(req,res);
          }
      }
      res.statusCode=404;
      res.statussMessage="Resource not Found";
      res.end();
      break;
    case'post':
    var urlParts=url.parse(req.url);
      switch(req.method){
        case'get':
          for(var i=0;i<this._postRoutes.length;i++){

          var match=this._postRoutes[i].exec(urlParts.pathname);
          if(match){
            return this.postActions[i](req,res);
          }
        }
        res.statusCode=404;
        res.statussMessage="Resource not Found";
        res.end();
        break;
    default:
    var msg="Uknown method"+req.method;
    res.statusCode=400;
    res.statusMessage= msg;
    console.error(msg);
    res.end(msg);
  }
}
