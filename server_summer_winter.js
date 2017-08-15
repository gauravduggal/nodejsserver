#!/usr/bin/env nodejs
var http = require('http');
var url = require('url');
var fs = require('fs');




http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  //get query string appended at the end of URL
  var query_str = q.path;
  //console.log(str);
  //parse string to get various fields
  var query_parsed_str = parse_query(query_str);
  console.log(query_parsed_str);
  res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
      
}).listen(8080);

/*
function query_mysql(res,mysql_query_str,query_parsed_str)
{
  con.query(mysql_query_str, function(err, rows, fields)
  {
    if (!err)
      {
      console.log(rows);
      
      }
    else
      {
      console.log('Error while performing Query.');
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
      }
  
      res.writeHead(200, {'Content-Type': 'text/html'});
      
      for (var i in rows){
        var a = rows[i];
        console.log(a);
      }
      res.write(JSON.stringify(rows[0])+' from '+query_parsed_str[2]); //convert rows object to a string and send to server


      return res.end();
  });
}
*/

//parses url string for stat={min,max,median} ,attr={sepal_length, sepal_width, petal_length, petal_width}
//and iris = Iris-setosa,Iris-versicolor,Iris-virginica
function parse_query(url_str)
{
  var vars = url_str.split('&');
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
  //console.log(query_parsed_str);
  return query_parsed_str;
}