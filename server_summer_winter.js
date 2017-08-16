#!/usr/bin/env nodejs
var http = require('http');
var url = require('url');
var fs = require('fs');
iris_virginica_data=[];
iris_setosa_data=[];
iris_versicolor_data=[];


var columns = ["sepal_length","sepal_width","petal_length","petal_width","iris"];
require("csv-to-array")({
   file: "./iris.csv",
   columns: columns
}, function (err, rows) {
  var ctr_iris_virginica=0, ctr_iris_setosa=0, ctr_iris_versicolor=0;
  for (var i=0; i<Object.keys(rows).length;i++)
  {
    //console.log(i+' '+rows[i].iris);
    if(rows[i].iris=='Iris-virginica')
      iris_virginica_data[ctr_iris_virginica++]=rows[i];
    if(rows[i].iris=='Iris-setosa')
      iris_setosa_data[ctr_iris_setosa++]=rows[i];
    if(rows[i].iris=='Iris-versicolor')
      iris_versicolor_data[ctr_iris_versicolor++]=rows[i];

  }
  //console.log(iris_setosa_data[0]['petal_width']);
  //console.log(median(iris_virginica_data,'petal_length'));
  //data_obj = rows;

});




http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  //get query string appended at the end of URL
  var query_str = q.path;
  //console.log(str);
  //parse string to get various fields
  var query_parsed_str = parse_query(query_str);
  console.log(query_parsed_str);
  var result;
  if (query_parsed_str[0]=='max')
    {
     if(query_parsed_str[2]=="Iris-setosa")
      result = max(iris_setosa_data,query_parsed_str[1]);
     else if(query_parsed_str[2]=="Iris-virginica")
      result = max(iris_virginica_data,query_parsed_str[1]);
     else if(query_parsed_str[2]=="Iris-versicolor")
      result = max(iris_versicolor_data,query_parsed_str[1]);
    }
  else if (query_parsed_str[0]=='min')
    {
     if(query_parsed_str[2]=="Iris-setosa")
      result = min(iris_setosa_data,query_parsed_str[1]);
     else if(query_parsed_str[2]=="Iris-virginica")
      result = min(iris_virginica_data,query_parsed_str[1]);
     else if(query_parsed_str[2]=="Iris-versicolor")
      result = min(iris_versicolor_data,query_parsed_str[1]);
    
    }
  else if (query_parsed_str[0]=='median')
    {
      if(query_parsed_str[2]=="Iris-setosa")
      result = median(iris_setosa_data,query_parsed_str[1]);
     else if(query_parsed_str[2]=="Iris-virginica")
      result = median(iris_virginica_data,query_parsed_str[1]);
     else if(query_parsed_str[2]=="Iris-versicolor")
      result = median(iris_versicolor_data,query_parsed_str[1]);
    
    }
    
  res.writeHead(200,{'Content-Type': 'text/html'});
  return res.end(query_parsed_str[0]+' of '+ query_parsed_str[1]+ ' in '+query_parsed_str[2]+' is: '+result);
      
}).listen(8080);
  

function min(data_obj, u_attribute)
{
  //console.log(data_obj.toString()+u_attribute.toString());
  var min=data_obj[0][u_attribute];
  for (var i=1; i<Object.keys(data_obj).length;i++)
  {
    if (min>data_obj[i][u_attribute])
      min=data_obj[i][u_attribute];
  }
  console.log('min is: '+min);
return min;
}

function max(data_obj, u_attribute)
{
 // console.log(data_obj.toString()+u_attribute.toString());
  
  var max=data_obj[0][u_attribute];
  for (var i=1; i<Object.keys(data_obj).length;i++)
  {
    if (max<data_obj[i][u_attribute])
      max=data_obj[i][u_attribute];
  }
  console.log('max is: '+max);
  return max;
}

function median(data_obj, u_attribute)
{
  var number_arr=[];
  var length = Object.keys(data_obj).length;
  for(var i=0; i<Object.keys(data_obj).length;i++)
    {
      number_arr[i]=Number(data_obj[i][u_attribute]);
      //console.log(data_obj[i][u_attribute]);
    }
    number_arr= number_arr.sort();
  if (length%2 == 0)
  {
    return number_arr[Math.floor(length/2)]
  }
  else
    return (number_arr[Math.floor(length/2)] + number_arr[Math.ceil(length/2)])/2;
  
 
}



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