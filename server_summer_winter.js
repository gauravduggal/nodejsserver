#!/usr/bin/env nodejs
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var query_str = q.path;
  //console.log(str);
  var vars = query_str.split('&');
  //console.log(vars)
  var query_parsed_str = []; 
  for (var i=0; i<vars.length;i++)
  {
    var pair = vars[i].split('=');
    //console.log(pair[0]);
    
    switch(pair[0])
      {
        case '/?stat':
        //console.log('stat is:')
        //console.log(pair[1]);
        query_parsed_str[0]=pair[1];
        break;
        case 'attr':
        //console.log('attr is:')
        //console.log(pair[1]);
        query_parsed_str[1]=pair[1];
        break;
        case 'iris':
        //console.log('iris is:')
        //console.log(pair[1]);
        query_parsed_str[2]=pair[1];
        break;
        default:
        console.log('query incorrect');
         
      }



  }
  console.log(query_parsed_str);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data)
    {
    if (err)
     {
      res.writeHead(404, {'Content-Type': 'text/html'});
       return res.end("404 Not Found");
     }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);